import { generateMetadata as createMetadata } from "@/lib/metadata";
import { Metadata } from "next";

export const metadata: Metadata = createMetadata({
  title: "Dashboard",
  description:
    "Manage your anonymous feedback, view messages, and control your feedback settings.",
  url: "/dashboard",
  noindex: true, // Dashboard is private and shouldn't be indexed
});

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
