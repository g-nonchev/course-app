import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import SessionProviderWrapper from '@/components/SessionProviderWrapper';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CourseHub - Learn from Expert Mentors",
  description: "Discover and enroll in high-quality online courses taught by expert mentors. Advance your skills with our comprehensive course catalog.",
  keywords: ["online courses", "education", "learning", "mentors", "skills"],
  authors: [{ name: "CourseHub Team" }],
  openGraph: {
    title: "CourseHub - Learn from Expert Mentors",
    description: "Discover and enroll in high-quality online courses taught by expert mentors.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "CourseHub - Learn from Expert Mentors",
    description: "Discover and enroll in high-quality online courses taught by expert mentors.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
      >
        <SessionProviderWrapper>
          <Header />
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
        </SessionProviderWrapper>
      </body>
    </html>
  );
}
