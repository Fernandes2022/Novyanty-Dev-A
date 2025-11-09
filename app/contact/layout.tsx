import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us - Creative Workspace",
  description: "Get in touch with Creative Workspace. We reply within 24 hours.",
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
