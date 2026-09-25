import type { Metadata } from "next";
import { Asap, Bricolage_Grotesque } from "next/font/google";
import "./globals.css";

const display = Bricolage_Grotesque({ variable: "--font-bricolage", subsets: ["latin"], axes: ["opsz", "wdth"] });
const body = Asap({ variable: "--font-asap", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Bates Landscaping | Chester, Delaware & Montgomery Counties, PA",
  description:
    "Landscape design, hardscaping, drainage, bamboo remediation, maintenance and snow + ice for homes and commercial properties in Southeastern PA.",
  robots: { index: false, follow: false },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable} antialiased`}>
      <body>{children}</body>
    </html>
  );
}
