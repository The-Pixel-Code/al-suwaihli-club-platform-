// # src/lib/db/schema.ts

import { 
  pgTable, 
  text, 
  timestamp, 
  boolean,
  uuid,
  varchar,
  json,
  index,
  unique
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

// ============ RBAC TABLES ============

// Permissions table
export const permissions = pgTable("permissions", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: varchar("name", { length: 100 }).notNull().unique(),
  resource: varchar("resource", { length: 100 }).notNull(), // e.g., 'members', 'events', 'content'
  action: varchar("action", { length: 50 }).notNull(), // e.g., 'create', 'read', 'update', 'delete'
  description: text("description"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
}, (table) => ({
  resourceActionIdx: index("permissions_resource_action_idx").on(table.resource, table.action),
}));

// Roles table
export const roles = pgTable("roles", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: varchar("name", { length: 100 }).notNull().unique(),
  description: text("description"),
  isSystemRole: boolean("is_system_role").notNull().default(false), // Cannot be deleted
  isActive: boolean("is_active").notNull().default(true),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

// Role-Permission junction table
export const rolePermissions = pgTable("role_permissions", {
  id: uuid("id").defaultRandom().primaryKey(),
  roleId: uuid("role_id").references(() => roles.id, { onDelete: "cascade" }),
  permissionId: uuid("permission_id").references(() => permissions.id, { onDelete: "cascade" }),
  createdAt: timestamp("created_at").notNull().defaultNow(),
}, (table) => ({
  rolePermissionUnique: unique().on(table.roleId, table.permissionId),
  roleIdx: index("role_permissions_role_idx").on(table.roleId),
  permissionIdx: index("role_permissions_permission_idx").on(table.permissionId),
}));

// User-Role junction table (users can have multiple roles)
export const userRoles = pgTable("user_roles", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: uuid("user_id").references(() => users.id, { onDelete: "cascade" }),
  roleId: uuid("role_id").references(() => roles.id, { onDelete: "cascade" }),
  assignedBy: uuid("assigned_by").references(() => users.id),
  assignedAt: timestamp("assigned_at").notNull().defaultNow(),
  expiresAt: timestamp("expires_at"), // Optional expiration
  isActive: boolean("is_active").notNull().default(true),
}, (table) => ({
  userRoleUnique: unique().on(table.userId, table.roleId),
  userIdx: index("user_roles_user_idx").on(table.userId),
  roleIdx: index("user_roles_role_idx").on(table.roleId),
}));

// Updated users table (remove simple role field)
export const users = pgTable("users", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: varchar("name", { length: 255 }),
  email: varchar("email", { length: 255 }).notNull().unique(),
  emailVerified: timestamp("email_verified", { mode: "date" }),
  image: text("image"),
  password: text("password"),
  isActive: boolean("is_active").notNull().default(true),
  phoneNumber: varchar("phone_number", { length: 20 }),
  address: text("address"),
  dateOfBirth: timestamp("date_of_birth", { mode: "date" }),
  emergencyContact: varchar("emergency_contact", { length: 255 }),
  lastLoginAt: timestamp("last_login_at"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
}, (table) => ({
  emailIdx: index("users_email_idx").on(table.email),
}));

// Activity logs for RBAC actions
export const activityLogs = pgTable("activity_logs", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: uuid("user_id").references(() => users.id),
  action: varchar("action", { length: 100 }).notNull(),
  resource: varchar("resource", { length: 100 }).notNull(),
  resourceId: varchar("resource_id", { length: 255 }),
  details: json("details"),
  ipAddress: varchar("ip_address", { length: 45 }),
  userAgent: text("user_agent"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
}, (table) => ({
  userIdx: index("activity_logs_user_idx").on(table.userId),
  actionIdx: index("activity_logs_action_idx").on(table.action),
  resourceIdx: index("activity_logs_resource_idx").on(table.resource),
}));

// ============ RELATIONS ============

export const usersRelations = relations(users, ({ many }) => ({
  userRoles: many(userRoles),
  assignedRoles: many(userRoles, { relationName: "assignedBy" }),
  activityLogs: many(activityLogs),
}));

export const rolesRelations = relations(roles, ({ many }) => ({
  rolePermissions: many(rolePermissions),
  userRoles: many(userRoles),
}));

export const permissionsRelations = relations(permissions, ({ many }) => ({
  rolePermissions: many(rolePermissions),
}));

export const rolePermissionsRelations = relations(rolePermissions, ({ one }) => ({
  role: one(roles, {
    fields: [rolePermissions.roleId],
    references: [roles.id],
  }),
  permission: one(permissions, {
    fields: [rolePermissions.permissionId],
    references: [permissions.id],
  }),
}));

export const userRolesRelations = relations(userRoles, ({ one }) => ({
  user: one(users, {
    fields: [userRoles.userId],
    references: [users.id],
  }),
  role: one(roles, {
    fields: [userRoles.roleId],
    references: [roles.id],
  }),
  assignedByUser: one(users, {
    fields: [userRoles.assignedBy],
    references: [users.id],
    relationName: "assignedBy",
  }),
}));