import type { Metadata } from "next";
import { SiteFrame } from "@/components/site-frame";
import "./globals.css";

export const metadata: Metadata = {
  title: "OPC Pixel Office",
  description: "独立开发者的一人公司像素办公室前端 Demo",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" className="h-full">
      <body className="min-h-full bg-[var(--opc-ink)] text-[var(--opc-cream)]">
        <div className="opc-grid fixed inset-0 opacity-30" aria-hidden="true" />
        <SiteFrame>{children}</SiteFrame>
      </body>
    </html>
  );
}
