import { ThemeWrapper } from "@/component/layout/theme-wraper";
import "@/styles/global.css";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import React from "react";

export const metadata = {
  title: "Recruitment System",
  description: "Recruitment System",
};

export type PageProps = Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>;

export default async function RootLayout({ children, params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <head>
        <meta name="emotion-insertion-point" content="" />
      </head>
      <body>
        <NextIntlClientProvider messages={messages}>
          <ThemeWrapper>{children}</ThemeWrapper>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
