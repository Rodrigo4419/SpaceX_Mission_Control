import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter, Inter_Tight } from "next/font/google";
import "./globals.css";

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

export const interSans = Inter({
  variable: "--font-inter-sans",
  subsets: ["latin"],
  display: "swap",
});

export const interTight = Inter_Tight({
  variable: "--font-inter-tight",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://spacexmissioncontrol.vercel.app"),
  title: {
    default: "SpaceX Mission Control",
    template: "%s | SpaceX MC",
  },
  description: "Discover SpaceX launches and missions",
  openGraph: {
    title: "SpaceX Mision Control",
    description: "Discover SpaceX launches and missions",
    siteName: "SpaceX Mission Control",
    images: [
      {
        url: "/images/backgrounds/meta-img.png",
        width: 1920,
        height: 1080,
        alt: "SpaceX Mission Control Home",
      },
    ],
    type: "website",
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
        className={`${interSans.variable} ${interTight.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
