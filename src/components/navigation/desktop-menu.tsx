"use client";

import React, { useState, useEffect } from "react";
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
  const [isScrolled, setIsScrolled] = useState(false);
  const { lang: locale, isArabic: isRtl } = useLanguage();
  const t = useTranslations("Navigation");
  const pathname = usePathname();
  const navItems = getNavItems(t, locale);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Check initial scroll position

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={cn(
        "fixed top-0 inset-x-0 w-full z-50 transition-all duration-300",
        isRtl && "rtl",
        isScrolled
          ? [
              "py-2 px-6",
              "bg-gray/80 dark:bg-gray-900/80 opacity-95",
              "backdrop-blur-3xl backdrop-saturate-150",
              "border-b border-gray-200/20 dark:border-gray-700/20",
              "shadow-lg",
            ]
          : ["py-4 px-6", "bg-transparent"]
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link
          href={`/${locale}`}
          className={cn(
            "flex items-center gap-2 transition-transform duration-300",
            isScrolled && "scale-90"
          )}
          onClick={() => setActive(null)}
        >
          <ClubLogo
            width={isScrolled ? 60 : 80}
            height={isScrolled ? 60 : 80}
            className="rounded-full transition-all duration-300"
          />
        </Link>

        {/* Navigation Items - Centered */}
        <div className="flex-1 flex justify-center">
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
                      "font-medium text-sm transition-colors duration-200",
                      isScrolled
                        ? "text-gray-800 dark:text-gray-100 hover:text-[#d51a2d] dark:hover:text-[#f2b631]"
                        : "text-gray-900 dark:text-white hover:text-[#d51a2d]",
                      pathname === item.href &&
                        "text-[#d51a2d] dark:text-[#f2b631]"
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
    </div>
  );
};

export default DesktopMenu;
