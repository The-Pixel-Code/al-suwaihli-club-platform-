

// src/components/providers/app-providers.tsx
import { QueryProvider } from "./query-provider";
import { IntlProvider } from "./intl-provider";
import { SessionProvider } from "./session-provider";
import { ThemeProvider } from "./theme-provider";
import { Session } from "next-auth";

interface AppProvidersProps {
  children: React.ReactNode;
  locale: string;
  session?: Session | null;
}

export async function AppProviders({ 
  children, 
  locale, 
  session 
}: AppProvidersProps) {
  return (
    <QueryProvider>
      <SessionProvider session={session}>
        <ThemeProvider
          attribute="class"
          // FIXME: change default Theme to system
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <IntlProvider locale={locale}>
            {children}
          </IntlProvider>
        </ThemeProvider>
      </SessionProvider>
    </QueryProvider>
  );
}
