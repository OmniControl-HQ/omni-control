import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "OmniControl - Remote PC Control",
  description: "Control your PC from your phone. Free and open source.",
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
