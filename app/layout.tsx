import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/geist";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Creative Workspace - Build Websites Before Your Coffee Cools",
  description: "No code. No drama. Just say what you want and watch the magic happen. Build professional websites in minutes with AI-powered adaptive design.",
  keywords: ["website builder", "no code", "AI", "web design", "creative workspace"],
  authors: [{ name: "Creative Workspace Team" }],
  openGraph: {
    title: "Creative Workspace - Build Websites Before Your Coffee Cools",
    description: "No code. No drama. AI-powered website builder that brings your ideas to life.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
