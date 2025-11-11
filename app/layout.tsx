import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { LayoutClient } from "./layout-client";
import "./globals.css";

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Creative Workspace - Build Websites with AI",
  description: "No code. No drama. Just say what you want and watch the magic happen. AI-powered website builder with professional templates, real-time collaboration, and instant deployment.",
  keywords: ["AI website builder", "no-code", "web development", "creative workspace", "AI tools", "website design"],
  authors: [{ name: "Creative Workspace Team" }],
  creator: "Creative Workspace",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://my-creative-workspace.vercel.app",
    title: "Creative Workspace - Build Websites with AI",
    description: "No code. No drama. Just say what you want and watch the magic happen.",
    siteName: "Creative Workspace",
  },
  twitter: {
    card: "summary_large_image",
    title: "Creative Workspace - Build Websites with AI",
    description: "No code. No drama. Just say what you want and watch the magic happen.",
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
    <html lang="en" suppressHydrationWarning className="dark" style={{ colorScheme: "dark" }}>
      <body suppressHydrationWarning className={`dark ${inter.variable} antialiased`}>
        <LayoutClient>{children}</LayoutClient>
      </body>
    </html>
  );
}
