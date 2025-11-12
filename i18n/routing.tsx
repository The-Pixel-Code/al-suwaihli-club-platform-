import { defineRouting } from "next-intl/routing"
import { createNavigation } from "next-intl/navigation"

export const routing = defineRouting({
  locales: ["en", "ar"],
  defaultLocale: "en",
  pathnames: {
    "/": "/",
    "/club/history": {
      en: "/club/history",
      ar: "/ar/club/history",
    },
  },
})

export const { Link, redirect, usePathname, useRouter, getPathname } = createNavigation(routing)
