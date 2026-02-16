import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { LayoutClient } from "./layout-client";
import "./globals.css";

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Miravoxx – AI-Powered Website Builder",
  description:
    "Miravoxx helps you create and launch AI-generated websites with integrated payments, email, and social automation.",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://miravoxx.com",
    title: "Miravoxx – AI-Powered Website Builder",
    description:
      "Create and launch AI-generated websites with Miravoxx.",
    siteName: "Miravoxx",
  },
  twitter: {
    card: "summary_large_image",
    title: "Miravoxx – AI-Powered Website Builder",
    description:
      "Create and launch AI-generated websites with Miravoxx.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="" >
      <body suppressHydrationWarning className={`${inter.variable} antialiased`}>
        <LayoutClient>{children}</LayoutClient>
      </body>
    </html>
  );
}
