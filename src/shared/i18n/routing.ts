import { defineRouting } from "next-intl/routing";
import { i18n } from "./i18n-config";
import { createSharedPathnamesNavigation } from "next-intl/navigation";

export const routing = defineRouting({
  locales: i18n.locales,
  defaultLocale: i18n.defaultLocale
})

export const { Link, redirect, usePathname, useRouter } = createSharedPathnamesNavigation(routing)
