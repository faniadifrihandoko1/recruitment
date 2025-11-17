import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  // A list of all locales that are supported
  locales: ["id", "en"] as const,
  localePrefix: "always",

  // Used when no locale matches
  defaultLocale: "id",
});
