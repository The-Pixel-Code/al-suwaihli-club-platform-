import type { NavItem } from "./types"

export const getNavItems = (t: (key: string) => string, locale: string): NavItem[] => [
  {
    id: "home",
    label: t("home"),
    href: `/${locale}`,
  },
  {
    id: "club",
    label: t("club"),
    children: [
      {
        label: t("clubHistory"),
        href: `/${locale}/club/history`,
        description: t("clubHistoryDesc"),
      },
      {
        label: t("championships"),
        href: `/${locale}/club/championships`,
        description: t("championshipsDesc"),
      },
      {
        label: t("clubMagazine"),
        href: `/${locale}/club/magazine`,
        description: t("clubMagazineDesc"),
      },
      {
        label: t("cityOfMisrata"),
        href: `/${locale}/club/city-of-misrata`,
        description: t("cityOfMisrataDesc"),
      },
      {
        label: t("clubLegends"),
        href: `/${locale}/club/legends`,
        description: t("clubLegendsDesc"),
      },
    ],
  },
  {
    id: "academy",
    label: t("academy"),
    href: `/${locale}/academy`,
  },
  {
    id: "sports",
    label: t("sportsActivities"),
    children: [
      {
        label: t("footballWithAgeGroups"),
        href: `/${locale}/sports/football`,
        description: t("footballWithAgeGroupsDesc"),
      },
      {
        label: t("handballWithAgeGroups"),
        href: `/${locale}/sports/handball`,
        description: t("handballWithAgeGroupsDesc"),
      },
      {
        label: t("volleyballWithAgeGroups"),
        href: `/${locale}/sports/volleyball`,
        description: t("volleyballWithAgeGroupsDesc"),
      },
      {
        label: t("futsal"),
        href: `/${locale}/sports/futsal`,
        description: t("futsalDesc"),
      },
      {
        label: t("otherSports"),
        href: `/${locale}/sports/other`,
        description: t("otherSportsDesc"),
      },
    ],
  },
  {
    id: "schedule",
    label: t("leagueSchedule"),
    href: `/${locale}/league-schedule`,
  },
  {
    id: "ClubRadio",
    label: t("clubRadio"),
    href: `/${locale}/club-radio`,
  },
]
