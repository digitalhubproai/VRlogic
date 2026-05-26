import type { Metadata } from "next";
import localFont from "next/font/local";
import { Geist } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const azonix = localFont({
  src: "../../public/fonts/Azonix.otf",
  variable: "--font-azonix",
});

const korvia = localFont({
  src: "../../public/fonts/Korvia.ttf",
  variable: "--font-korvia-next",
});

export const metadata: Metadata = {
  title: "VR Logic | Futuristic Logistics & VR Monitoring",
  description: "Explore the future of logistics with our immersive VR monitoring and AI-driven distribution platform.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${azonix.variable} ${korvia.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
