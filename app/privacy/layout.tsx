import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy - Creative Workspace",
  description: "Learn how Creative Workspace protects your data and privacy.",
};

export default function PrivacyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
