import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Refund Policy - Creative Workspace",
  description: "14-day money-back guarantee. Full refund, no questions asked.",
};

export default function RefundLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
