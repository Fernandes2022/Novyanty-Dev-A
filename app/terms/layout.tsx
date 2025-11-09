import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service - Creative Workspace",
  description: "Terms and conditions for using Creative Workspace.",
};

export default function TermsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
