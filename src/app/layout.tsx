import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { AccessibilityToolbar } from "@/components/features/AccessibilityToolbar";
import { TranslationWidget } from "@/components/ai/TranslationWidget";
import ChatBot from "@/components/chat/ChatBot";
import "./globals.css";

import { LanguageProvider } from "@/context/LanguageContext";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "DigiSwasthya Foundation | Accessible Healthcare",
  description: "Making healthcare services affordable and accessible for rural communities across India by leveraging technology.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans`}>
        <LanguageProvider>
          {children}
          <AccessibilityToolbar />
          <TranslationWidget />
          <ChatBot />
        </LanguageProvider>
      </body>
    </html>
  );
}
