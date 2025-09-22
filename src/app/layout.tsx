import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import Navigation from "@/components/navigation";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "TechHost - Hosting, VPS, Máy Chủ Vật Lý & Thiết Kế Website",
  description: "Dịch vụ hosting tốc độ cao, Cloud VPS, máy chủ vật lý và thiết kế website chuyên nghiệp. Giá tốt, hỗ trợ 24/7, uptime 99.9%",
  keywords: ["hosting", "vps", "máy chủ vật lý", "thiết kế website", "cloud", "domain", "ssl", "techhost"],
  authors: [{ name: "TechHost Team" }],
  openGraph: {
    title: "TechHost - Giải Pháp Hosting Toàn Diện",
    description: "Hosting, VPS, máy chủ vật lý và thiết kế website chuyên nghiệp tại Việt Nam",
    url: "https://techhost.vn",
    siteName: "TechHost",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "TechHost - Hosting & VPS Provider",
    description: "Giải pháp hosting toàn diện cho doanh nghiệp Việt Nam",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
        suppressHydrationWarning
      >
        <Navigation />
        {children}
        <Toaster />
      </body>
    </html>
  );
}
