// Updated src/app/[locale]/layout.tsx
import { Almarai } from "next/font/google";
import { hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { getTranslations } from "next-intl/server";
import { Toaster } from "@/components/ui/sonner";
import { AppProviders } from "@/components/providers";
import "./globals.css";

// Importing Google font
const almarai = Almarai({
  subsets: ["arabic"],
  weight: ["300", "400", "700", "800"],
  variable: "--font-almarai",
});

// Generate metadata for Arabic and English locales
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
  const { locale } = await params;
  
  // Ensure that the incoming locale is valid
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  // TODO: Get session from auth when implementing authentication
  // const session = await getServerSession(authOptions);

  return (
    <html lang={locale} dir={locale === 'ar' ? 'rtl' : 'ltr'}>
      <body className={`${almarai.variable} font-almarai antialiased`}>
        <AppProviders locale={locale} session={null}>
          {children}
          <Toaster />
        </AppProviders>
      </body>
    </html>
  );
}