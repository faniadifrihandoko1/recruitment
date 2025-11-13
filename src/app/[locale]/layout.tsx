import { ThemeWrapper } from "@/component/layout/theme-wraper";
import "@/styles/global.css";
import { Locale, NextIntlClientProvider } from "next-intl";
import { setRequestLocale } from "next-intl/server";

export const metadata = {
  title: "Modernize Next.js",
  description: "Modernize Next.js App",
};

export type PageProps = Readonly<{
  children: React.ReactNode;
  params: { locale: Locale };
}>;

export default function RootLayout({
  children,
  params: { locale },
}: PageProps) {
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
