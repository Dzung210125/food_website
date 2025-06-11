import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import Header from "@/components/Header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Foodie - Your Favorite Food Destination",
  description: "Experience the finest culinary delights",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <Header />
          {children}
        </Providers>
        <footer className="bg-gray-100 py-8 mt-16">
          <div className="max-w-7xl mx-auto px-4 text-center text-gray-600">
            <p>&copy; {new Date().getFullYear()} Foodie. All rights reserved.</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
