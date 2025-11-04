import type { Metadata } from "next";
import { Inter, Montserrat } from "next/font/google";
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "MLN122 - Các Quan Hệ Lợi Ích Kinh Tế Ở Việt Nam",
  description: "Website học tập môn MLN122 - Đại học FPT Quy Nhơn",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" suppressHydrationWarning>
      <body className={`${inter.variable} ${montserrat.variable} antialiased`}>
        <div className="min-h-screen flex flex-col">
          <Navbar />
          <main className="flex-1 pt-20">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
