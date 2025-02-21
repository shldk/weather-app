import "@/app/globals.css";
import { SearchBar } from "@/components/search-bar";
import Providers from "@/lib/providers";
import type React from "react";

import { ThemeToggle } from "@/components/theme-toggle";
import { Toaster } from "@/components/ui/sonner";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body>
        <Providers>
          <main className="container mx-auto p-8 space-y-6">
            <SearchBar />
            {children}
            <Toaster richColors={true} />
            <ThemeToggle className="fixed bottom-4 right-4" />
          </main>
        </Providers>
      </body>
    </html>
  );
}
