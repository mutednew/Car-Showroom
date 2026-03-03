import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import  { ReactNode } from "react";

const inter = Inter({
    subsets: ["latin"],
    variable: "--font-primary",
});

export const metadata: Metadata = {
    title: "Premium Car Showroom",
    description: "Virtual car showroom test task",
};

export default function RootLayout({
   children,
}: Readonly<{
    children: ReactNode;
}>) {
    return (
        <html lang="en" className={inter.variable}>
            <body>
                <main>{children}</main>
            </body>
        </html>
    );
}