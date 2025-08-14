import { Almarai } from "next/font/google";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { getTranslations } from "next-intl/server";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";

// Importing a Google font
const almarai = Almarai({
  subsets: ["arabic"],
  weight: ["300", "400", "700", "800"],
  variable: "--font-almarai",
});

// Generate metadata for Apple Arabic, English, and Arabic locales
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Metadata" });

  return {
    title: t("title"),
    description: t("description"),
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  // Ensure that the incoming `locale` is valid
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  return (
    <html lang={locale}>
      <body className={`${almarai.variable} font-almarai`}>
        <NextIntlClientProvider>
          {children}
          <Toaster />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
