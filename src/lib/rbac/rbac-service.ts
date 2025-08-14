// # src/lib/rbac/rbac-service.ts

import { db } from "@/lib/db";
import { 
  users, 
  roles, 
  permissions, 
  userRoles, 
  rolePermissions,
  activityLogs 
} from "@/lib/db/schema";
import { eq, and, inArray } from "drizzle-orm";

export class RBACService {
  // Get user permissions
  static async getUserPermissions(userId: string): Promise<string[]> {
    const userPermissions = await db
      .select({
        permission: permissions.name,
      })
      .from(userRoles)
      .innerJoin(roles, eq(userRoles.roleId, roles.id))
      .innerJoin(rolePermissions, eq(roles.id, rolePermissions.roleId))
      .innerJoin(permissions, eq(rolePermissions.permissionId, permissions.id))
      .where(
        and(
          eq(userRoles.userId, userId),
          eq(userRoles.isActive, true),
          eq(roles.isActive, true)
        )
      );

    return userPermissions.map(p => p.permission);
  }

  // Get user roles
  static async getUserRoles(userId: string) {
    return await db
      .select({
        id: roles.id,
        name: roles.name,
        description: roles.description,
      })
      .from(userRoles)
      .innerJoin(roles, eq(userRoles.roleId, roles.id))
      .where(
        and(
          eq(userRoles.userId, userId),
          eq(userRoles.isActive, true),
          eq(roles.isActive, true)
        )
      );
  }

  // Check if user has permission
  static async hasPermission(
    userId: string, 
    resource: string, 
    action: string
  ): Promise<boolean> {
    const permissionName = `${resource}:${action}`;
    const userPermissions = await this.getUserPermissions(userId);
    
    return userPermissions.includes(permissionName) || 
           userPermissions.includes('*:*'); // Super admin permission
  }

  // Assign role to user
  static async assignRole(
    userId: string, 
    roleId: string, 
    assignedBy: string,
    expiresAt?: Date
  ) {
    const [result] = await db.insert(userRoles).values({
      userId,
      roleId,
      assignedBy,
      expiresAt,
      isActive: true,
    }).returning();

    // Log activity
    await this.logActivity(assignedBy, 'role:assign', 'user', userId, {
      roleId,
      targetUserId: userId,
    });

    return result;
  }

  // Remove role from user
  static async removeRole(userId: string, roleId: string, removedBy: string) {
    const result = await db
      .update(userRoles)
      .set({ isActive: false })
      .where(
        and(
          eq(userRoles.userId, userId),
          eq(userRoles.roleId, roleId)
        )
      )
      .returning();

    // Log activity
    await this.logActivity(removedBy, 'role:remove', 'user', userId, {
      roleId,
      targetUserId: userId,
    });

    return result;
  }

  // Create new role
  static async createRole(
    name: string,
    description: string,
    permissionIds: string[],
    createdBy: string
  ) {
    const [role] = await db.insert(roles).values({
      name,
      description,
      isSystemRole: false,
      isActive: true,
    }).returning();

    // Assign permissions to role
    if (permissionIds.length > 0) {
      await db.insert(rolePermissions).values(
        permissionIds.map(permissionId => ({
          roleId: role.id,
          permissionId,
        }))
      );
    }

    // Log activity
    await this.logActivity(createdBy, 'role:create', 'role', role.id, {
      roleName: name,
      permissionIds,
    });

    return role;
  }

  // Log activity
  static async logActivity(
    userId: string,
    action: string,
    resource: string,
    resourceId: string,
    details?: any,
    ipAddress?: string,
    userAgent?: string
  ) {
    await db.insert(activityLogs).values({
      userId,
      action,
      resource,
      resourceId,
      details,
      ipAddress,
      userAgent,
    });
  }

  // Get all permissions
  static async getAllPermissions() {
    return await db.select().from(permissions).orderBy(permissions.resource, permissions.action);
  }

  // Get all roles
  static async getAllRoles() {
    return await db
      .select({
        id: roles.id,
        name: roles.name,
        description: roles.description,
        isSystemRole: roles.isSystemRole,
        isActive: roles.isActive,
        permissionCount: rolePermissions.permissionId,
      })
      .from(roles)
      .leftJoin(rolePermissions, eq(roles.id, rolePermissions.roleId))
      .orderBy(roles.name);
  }
}