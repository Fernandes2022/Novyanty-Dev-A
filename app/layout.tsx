import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Creative Workspace - AI-Powered Composition Platform",
  description: "Transform your ideas into stunning digital experiences with our adaptive composition engine. No code required.",
  keywords: ["creative", "workspace", "AI", "composition", "no-code", "web design"],
  authors: [{ name: "Creative Workspace Team" }],
  openGraph: {
    title: "Creative Workspace",
    description: "AI-powered creative composition platform",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Creative Workspace",
    description: "AI-powered creative composition platform",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} antialiased`}>
        {children}
      </body>
    </html>
  );
}
