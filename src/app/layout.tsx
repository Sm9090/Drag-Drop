import type { Metadata } from "next";
import { Inter, Lato, Montserrat, Roboto_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";


const inter = Lato({ subsets: ["latin"] ,weight: "700"});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
      <Toaster position="top-center" />
        {children}</body>
    </html>
  )
}