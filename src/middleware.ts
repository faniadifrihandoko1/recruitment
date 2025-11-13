import createMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";

import { routing } from "./i18n/routing";
import { FAKE_AUTH_COOKIE } from "./utils/auth/fakeAuth";

const intlMiddleware = createMiddleware(routing);

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
  const { pathname } = request.nextUrl;

  const locale = routing.locales;
  const normalizedPathname = pathname.replace(/\/+$/, "") || "/";
  const dashboardPath = `/${locale}/dashboard`;
  const isLoginRoute = isLoginPath(pathname);
  const isAuthenticated = Boolean(request.cookies.get(FAKE_AUTH_COOKIE)?.value);

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
