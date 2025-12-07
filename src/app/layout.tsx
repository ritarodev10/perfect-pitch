import { Space_Grotesk, Manrope } from "next/font/google";
import "./globals.css";

// UI labels & body text - Space Grotesk (matches recommendation, similar to Switzer)
const spaceGrotesk = Space_Grotesk({
  variable: "--font-ui",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

// Headings & prominent text - Manrope (modern, geometric, similar to Satoshi/Mona Sans)
const manrope = Manrope({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata = {
  title: "Pitch Perfect | AC Milan Dashboard",
  description: "Premium football analytics dashboard",
};

import { AppLayout } from "@/components/layout/AppLayout";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${spaceGrotesk.variable} ${manrope.variable} antialiased`}
      >
        <AppLayout>{children}</AppLayout>
      </body>
    </html>
  );
}
