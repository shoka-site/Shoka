import AdminLayout from "@/components/admin/AdminLayout";
import { ComponentDocsClient } from "./ComponentDocsClient";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "UI Component Library & Design System | Sehle Admin",
  description: "Visual component documentation and interactive sandbox for Sehle UI design system.",
};

export default function ComponentDocsPage() {
  return (
    <AdminLayout>
      <ComponentDocsClient />
    </AdminLayout>
  );
}
