import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Weather App Sasakazi",
  description: "Weather App Sasakazi",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
