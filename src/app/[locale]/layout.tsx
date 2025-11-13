import { ThemeWrapper } from "@/component/layout/theme-wraper";
import "@/styles/global.css";
import { Locale, NextIntlClientProvider } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import React from "react";

export const metadata = {
  title: "Modernize Next.js",
  description: "Modernize Next.js App",
};

export type PageProps = Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: Locale }>;
}>;

export default async function RootLayout({ children, params }: PageProps) {
  const { locale } = await params;

  setRequestLocale(locale);

  return (
    <html lang={locale}>
      <head>
        <meta name="emotion-insertion-point" content="" />
      </head>
      <body>
        <NextIntlClientProvider>
          <ThemeWrapper>{children}</ThemeWrapper>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
