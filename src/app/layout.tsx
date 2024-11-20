import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

import { PawPrint } from "lucide-react";
import Link from "next/link";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Petfinder",
  description: "Find your new best friend",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="flex flex-col min-h-screen">
          <header className="px-4 lg:px-6 h-14 flex items-center">
            <Link className="flex items-center justify-center" href="/">
              <PawPrint className="h-8 w-8 text-primary" />
              <span className="sr-only">Pet Finder</span>
            </Link>
            <nav className="ml-auto flex gap-4 sm:gap-6">
              <Link
                className="text-sm font-medium hover:underline underline-offset-4"
                href="#report"
              >
                Reportar
              </Link>
              <Link
                className="text-sm font-medium hover:underline underline-offset-4"
                href="#catalog"
              >
                Catálogo
              </Link>
            </nav>
          </header>
          {children}
          <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
            <p className="text-xs text-gray-500 dark:text-gray-400">
              © 2024 Pet Finder. Creado con ❤️ por{" "}
              <Link
                className="text-xs hover:underline underline-offset-4"
                href="https://github.com/jfreites"
                target="_blank"
              >
                Jonathan Freites
              </Link>
              .
            </p>
            <nav className="sm:ml-auto flex gap-4 sm:gap-6">
              <Link
                className="text-xs hover:underline underline-offset-4"
                href="#"
              >
                Términos de uso
              </Link>
              <Link
                className="text-xs hover:underline underline-offset-4"
                href="#"
              >
                Privacidad
              </Link>
            </nav>
          </footer>
        </div>
      </body>
    </html>
  );
}
