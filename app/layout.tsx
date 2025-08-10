import "./globals.css";
import type { Metadata } from "next";
import { I18nProvider } from "@/lib/i18n";

export const metadata: Metadata = {
  title: "MediScan",
  description: "MediScan Platform",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <I18nProvider>{children}</I18nProvider>
      </body>
    </html>
  );
}
