import { routing } from "@/i18n/routing";

const localeSet = new Set(routing.locales);

export const resolveLocale = (
  localeParam: string | string[] | undefined
): string => {
  if (!localeParam) {
    return routing.defaultLocale;
  }

  if (Array.isArray(localeParam)) {
    const [first] = localeParam;

    return first && localeSet.has(first as "en" | "id") ? first : routing.defaultLocale;
  }

  return localeSet.has(localeParam as "en" | "id") ? localeParam : routing.defaultLocale;
};

const ABSOLUTE_URL_REGEX = /^(https?:)?\/\//;

export const buildLocalizedHref = (
  href: string | undefined,
  locale: string
): string => {
  if (!href) return "#";
  if (ABSOLUTE_URL_REGEX.test(href)) return href;

  if (href.startsWith(`/${locale}`)) {
    return href;
  }

  if (href === "/") {
    return `/${locale}`;
  }

  const normalized = href.startsWith("/") ? href : `/${href}`;

  return `/${locale}${normalized}`;
};

export const normalizePath = (path: string) => path.replace(/\/+$/, "") || "/";

export const isActivePath = (currentPath: string, targetPath: string) => {
  if (targetPath === "/") {
    return currentPath === targetPath;
  }

  if (currentPath === targetPath) {
    return true;
  }

  return currentPath.startsWith(`${targetPath}/`);
};
