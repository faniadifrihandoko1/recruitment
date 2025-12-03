import createMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";

import { routing } from "./i18n/routing";

const intlMiddleware = createMiddleware(routing);
const locales = routing.locales;
const defaultLocale = routing.defaultLocale;

console.log("locale", locales);
console.log("defaultLocale", defaultLocale);

function getNormalizedPath(pathname: string): string {
  const parts = pathname.split("/").filter(Boolean);

  if (locales.includes(parts[0] as "id" | "en")) {
    parts.shift();
  }

  return parts.length > 0 ? `/${parts.join("/")}` : `/${defaultLocale}`;
}

const isLoginPath = (pathname: string) => {
  const normalized = pathname.replace(/\/+$/, "") || "/";

  if (normalized === "/") {
    return false;
  }

  const segments = normalized.split("/").filter(Boolean);
  const [first, ...rest] = segments;
  const remainingSegments = routing.locales.includes(
    first as (typeof routing)["locales"][number]
  )
    ? rest
    : segments;

  return remainingSegments.join("/") === "authentication/login";
};

export default function middleware(request: NextRequest) {
  const locale = request.cookies.get("NEXT_LOCALE")?.value || defaultLocale;

  const { pathname } = request.nextUrl;

  const normalizedPathname = getNormalizedPath(pathname);
  const dashboardPath = `/${locale}/dashboard`;
  const isLoginRoute = isLoginPath(pathname);
  const isAuthenticated = Boolean(request.cookies.get("session")?.value);

  if (!isAuthenticated && !isLoginRoute) {
    const redirectURL = request.nextUrl.clone();
    redirectURL.pathname = `/${locale}/authentication/login`;
    redirectURL.search = "";

    return NextResponse.redirect(redirectURL);
  }

  if (
    isAuthenticated &&
    (isLoginRoute ||
      normalizedPathname === `/${locale}` ||
      normalizedPathname === "/")
  ) {
    const redirectURL = request.nextUrl.clone();
    redirectURL.pathname = dashboardPath;
    redirectURL.search = "";

    return NextResponse.redirect(redirectURL);
  }

  return intlMiddleware(request);
}

export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
