import ThemeRegistry from "../utils/theme/ThemeRegistry";
import { ThemeWrapper } from "../component/layout/theme-wraper";
import "./global.css";

export const metadata = {
  title: "Modernize Next.js",
  description: "Modernize Next.js App",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta name="emotion-insertion-point" content="" />
      </head>
      <body>
        <ThemeWrapper>{children}</ThemeWrapper>
      </body>
    </html>
  );
}
