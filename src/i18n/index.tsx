import { getRequestConfig } from "next-intl/server";
import { notFound } from "next/navigation";

const locales = ["id", "en", "zh"] as const;
type Locale = (typeof locales)[number];

export default getRequestConfig(async ({ locale }) => {
  if (!locale || !locales.includes(locale as Locale)) notFound();

  return {
    locale,
    messages: await import(`./messages/${locale}.json`),
  };
});
