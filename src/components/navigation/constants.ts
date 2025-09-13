import { NavItem } from "./types";

export const getNavItems = (t: (key: string) => string, locale: string): NavItem[] => [
  {
    id: "home",
    label: t("home"),
    href: `/${locale}`,
  },
  {
    id: "about",
    label: t("about"),
    children: [
      {
        label: t("history"),
        href: `/${locale}/about/history`,
        description: t("historyDesc"),
      },
      {
        label: t("mission"),
        href: `/${locale}/about/mission`,
        description: t("missionDesc"),
      },
      {
        label: t("board"),
        href: `/${locale}/about/board`,
        description: t("boardDesc"),
      },
    ],
  },
  {
    id: "sports",
    label: t("sports"),
    children: [
      {
        label: t("football"),
        href: `/${locale}/sports/football`,
        description: t("footballDesc"),
      },
      {
        label: t("basketball"),
        href: `/${locale}/sports/basketball`,
        description: t("basketballDesc"),
      },
      {
        label: t("volleyball"),
        href: `/${locale}/sports/volleyball`,
        description: t("volleyballDesc"),
      },
    ],
  },
  {
    id: "cultural",
    label: t("cultural"),
    href: `/${locale}/cultural-events`,
  },
  {
    id: "news",
    label: t("news"),
    href: `/${locale}/news`,
  },
  {
    id: "contact",
    label: t("contact"),
    href: `/${locale}/contact`,
  },
];
