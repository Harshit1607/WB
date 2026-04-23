import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from 'react-hot-toast';
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "GravityShop | Modern E-commerce Experience",
  description: "Discover premium products with a seamless shopping experience at GravityShop.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} antialiased`}>
      <body className="bg-background text-foreground selection:bg-primary/20 selection:text-primary">
        <Toaster position="bottom-right" toastOptions={{
          style: {
            background: 'var(--card)',
            color: 'var(--card-foreground)',
            borderRadius: '1rem',
            border: '1px solid var(--border)',
          }
        }} />
        {children}
      </body>
    </html>
  );
}
