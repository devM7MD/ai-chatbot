import "../styles/globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
    title: "المساعد الذكي - محادثات الذكاء الاصطناعي",
    description: "منصة محادثة ذكاء اصطناعي متطورة تشبه Claude",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="ar" dir="rtl">
            <body
                className={`${inter.variable} font-sans min-h-screen flex flex-col`}>
                <Header />
                <main className="flex-1">{children}</main>
                <Footer />
            </body>
        </html>
    );
}
