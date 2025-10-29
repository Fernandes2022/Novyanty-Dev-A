import type { Metadata } from "next";
import { SuppressHydrationWarning } from "./suppressHydration";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Creative Workspace - Build Websites with AI",
  description: "No code. No drama. Just say what you want and watch the magic happen.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} antialiased`}>
        <SuppressHydrationWarning />
        {children}
      </body>
    </html>
  );
}
// Deployment trigger - Mon Oct 27 10:13:17 UTC 2025
// Force deploy 1761560835
