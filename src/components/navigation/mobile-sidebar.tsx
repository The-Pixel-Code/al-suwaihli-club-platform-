"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X, ChevronDown, Home, Users, Trophy, Calendar, Newspaper, Phone } from "lucide-react";

import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";
import useLanguage from "@/hooks/use-language";

import { cn } from "@/lib/utils";
import { ClubLogo } from "@/components/ui/club-logo";
import { TranslateButton } from "@/components/ui/translate-button";

import { getNavItems } from "./constants";


const MobileSidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [expandedItems, setExpandedItems] = useState<string[]>([]);
  const pathname = usePathname();
  const t = useTranslations("Navigation");
  const { lang: locale, isArabic: isRtl } = useLanguage();
  const navItems = getNavItems(t, locale);

  const toggleExpanded = (itemId: string) => {
    setExpandedItems((prev) =>
      prev.includes(itemId)
        ? prev.filter((id) => id !== itemId)
        : [...prev, itemId]
    );
  };

  const getIcon = (id: string) => {
    switch (id) {
      case "home":
        return <Home className="w-5 h-5" />;
      case "about":
        return <Users className="w-5 h-5" />;
      case "sports":
        return <Trophy className="w-5 h-5" />;
      case "cultural":
        return <Calendar className="w-5 h-5" />;
      case "news":
        return <Newspaper className="w-5 h-5" />;
      case "contact":
        return <Phone className="w-5 h-5" />;
      default:
        return null;
    }
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-4 z-50 p-2 rounded-lg bg-white/90 backdrop-blur-md shadow-lg border border-gray-200"
        style={{ [isRtl ? "right" : "left"]: "1rem" }}
        aria-label="Toggle menu"
      >
        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="lg:hidden fixed inset-0 bg-black/50 z-40"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: isRtl ? "100%" : "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: isRtl ? "100%" : "-100%" }}
            transition={{ type: "spring", bounce: 0, duration: 0.4 }}
            className={cn(
              "lg:hidden fixed top-0 bottom-0 w-80 bg-white dark:bg-gray-900 shadow-2xl z-50 overflow-y-auto",
              isRtl ? "right-0" : "left-0"
            )}
          >
            {/* Logo Section */}
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-4">
                <ClubLogo
                  width={60}
                  height={60}
                  className="rounded-full"
                />
                <div>
                  <h2 className="font-bold text-lg text-gray-900 dark:text-white">
                    {t("clubName")}
                  </h2>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {t("established")} 1944
                  </p>
                </div>
              </div>
            </div>

            {/* Navigation Items */}
            <nav className="p-4">
              {navItems.map((item) => (
                <div key={item.id} className="mb-2">
                  {item.href ? (
                    <Link
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className={cn(
                        "flex items-center gap-3 px-4 py-3 rounded-lg transition-colors",
                        pathname === item.href
                          ? "bg-red-50 text-red-600 dark:bg-red-900/20 dark:text-red-400"
                          : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
                      )}
                    >
                      {getIcon(item.id)}
                      <span className="font-medium">{item.label}</span>
                    </Link>
                  ) : (
                    <>
                      <button
                        onClick={() => toggleExpanded(item.id)}
                        className="w-full flex items-center justify-between gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800 transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          {getIcon(item.id)}
                          <span className="font-medium">{item.label}</span>
                        </div>
                        <ChevronDown
                          className={cn(
                            "w-4 h-4 transition-transform",
                            expandedItems.includes(item.id) && "rotate-180"
                          )}
                        />
                      </button>
                      <AnimatePresence>
                        {expandedItems.includes(item.id) && item.children && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="overflow-hidden"
                          >
                            <div className={cn("py-2", isRtl ? "pr-12" : "pl-12")}>
                              {item.children.map((child) => (
                                <Link
                                  key={child.href}
                                  href={child.href}
                                  onClick={() => setIsOpen(false)}
                                  className="block px-4 py-2 text-sm text-gray-600 hover:text-red-600 dark:text-gray-400 dark:hover:text-red-400 transition-colors"
                                >
                                  <div className="font-medium">{child.label}</div>
                                  <div className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                                    {child.description}
                                  </div>
                                </Link>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </>
                  )}
                </div>
              ))}
            </nav>

            {/* Language Switcher */}
            <TranslateButton />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default MobileSidebar;