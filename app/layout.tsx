import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Ilia Alenabi",
  description: "Computer Science student at University of Waterloo",
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
