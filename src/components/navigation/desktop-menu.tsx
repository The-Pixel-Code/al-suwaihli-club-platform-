"use client";

import React, { useState } from "react";
import Link from "next/link";

import useLanguage from "@/hooks/use-language";
import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";
import { Menu, MenuItem, HoveredLink } from "@/components/ui/navbar-menu";
import { TranslateButton } from "@/components/ui/translate-button";
import { ClubLogo } from "@/components/ui/club-logo";

import { getNavItems } from "./constants";

const DesktopMenu = () => {
  const [active, setActive] = useState<string | null>(null);
  const { lang: locale, isArabic: isRtl } = useLanguage();
  const t = useTranslations("Navigation");
  const pathname = usePathname();
  const navItems = getNavItems(t, locale);

  return (
    <div
      className={cn(
        "fixed top-2 inset-x-0 w-full px-6  mx-auto z-50 flex items-center justify-between bg-transparent",
        isRtl && "rtl"
      )}
    >
      {/* Logo */}
      <Link
        href={`/${locale}`}
        className="flex items-center gap-2"
        onClick={() => setActive(null)}
      >
        <ClubLogo width={40} height={40} className="rounded-full" />
        <span className="font-bold text-lg text-black dark:text-white">
          {t("clubName")}
        </span>
      </Link>

      {/* Navigation Items - Centered */}
      <div className="flex-1 flex justify-center pt-4">
        <Menu setActive={setActive}>
          {/* Dynamic Navigation Items */}
          {navItems.map((item) => {
            if (item.href && !item.children) {
              // Simple link items (Home, Cultural Events, News, Contact)
              return (
                <Link
                  key={item.id}
                  href={item.href}
                  className={cn(
                    "text-black dark:text-white font-medium text-sm",
                    pathname === item.href && "text-white"
                  )}
                  onClick={() => setActive(null)}
                >
                  {item.label}
                </Link>
              );
            } else if (item.children) {
              // Menu items with children (About, Sports)
              return (
                <MenuItem
                  key={item.id}
                  setActive={setActive}
                  active={active}
                  item={item.label}
                >
                  <div
                    className={cn(
                      item.id === "sports"
                        ? "grid grid-cols-2 gap-4 text-sm"
                        : "flex flex-col space-y-4 text-sm"
                    )}
                  >
                    {item.children.map((child) => (
                      <HoveredLink key={child.href} href={child.href}>
                        <div
                          className={item.id === "sports" ? "space-y-1" : ""}
                        >
                          <div className="font-semibold">{child.label}</div>
                          <div className="text-xs text-gray-500 dark:text-gray-400">
                            {child.description}
                          </div>
                        </div>
                      </HoveredLink>
                    ))}
                    {/* Add "Other Sports" for sports menu only */}
                    {item.id === "sports" && (
                      <HoveredLink href={`/${locale}/sports/other`}>
                        <div className="space-y-1">
                          <div className="font-semibold">
                            {t("otherSports")}
                          </div>
                          <div className="text-xs text-gray-500 dark:text-gray-400">
                            {t("otherSportsDesc")}
                          </div>
                        </div>
                      </HoveredLink>
                    )}
                  </div>
                </MenuItem>
              );
            }
            return null;
          })}
        </Menu>
      </div>

      {/* Language Switcher */}
      <TranslateButton />
    </div>
  );
};

export default DesktopMenu;
