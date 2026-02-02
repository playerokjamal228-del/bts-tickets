import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/Providers";
import { Header } from "@/components/Header";
import { PixelScripts } from "@/components/PixelScripts";
import { WhatsAppWidget } from "@/components/WhatsAppWidget";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "BTS Europe Tour 2026",
  description: "Official Ticket Sales for BTS Europe Tour",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${outfit.variable} antialiased bg-secondary text-text-primary pt-16`}
      >
        <Providers>
          <PixelScripts />
          <Header />
          {children}
          <WhatsAppWidget />
        </Providers>
      </body>
    </html>
  );
}

