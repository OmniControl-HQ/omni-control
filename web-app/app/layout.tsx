import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title:
    "Omni Control - Free Open Source Remote PC Control Software | Wireless Mouse & Keyboard App",
  description:
    "Free remote desktop control software. Turn your phone into a wireless mouse, keyboard, and media remote. Control Windows, macOS, Linux from Android/iOS. No ads, open source, 100% free.",
  verification: {
    google: "Tb8XPvHHAsnp2a5SuwrH5cbJdZLVwvcFa4_rn_IBveI",
    // yandex: "your-yandex-code",
    // bing: "your-bing-code",
  },
  other: {},
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
