import type { Metadata } from "next";

import { ThemeProvider } from "@/providers/theme-provider";
import "./globals.css";
// import { unstable_ViewTransition as ViewTransition } from 'react'
import { Toaster } from "@/components/ui/sonner";



export const metadata: Metadata = {
  title: "Notas app",
  description: "Generated with Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="es" suppressHydrationWarning>
      <head />
      <body>

        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
            {/* <ViewTransition> */}
            {children}
            {/* </ViewTransition> */}
            <Toaster />
          </div>
        </ThemeProvider>

      </body>
    </html>
  );
}
