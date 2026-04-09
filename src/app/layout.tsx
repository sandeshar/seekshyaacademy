import type { Metadata } from "next";
import { Toaster } from "react-hot-toast";
import "./globals.css";
import { getSettings } from "@/actions/settings";

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSettings();

  return {
    title: {
      default: settings?.seo?.title || "Seekshya Academy",
      template: settings?.seo?.titleTemplate || "%s | Seekshya Academy",
    },
    description: settings?.seo?.description || "Your Target to Chartered Accountancy Success",
    icons: {
      icon: settings?.logos?.favicon || [
        { url: "/favicon.ico" },
        { url: "/favicon.ico", sizes: "32x32" }
      ],
      apple: settings?.logos?.favicon || "/favicon.ico",
    },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
      </head>
      <body className="bg-background font-body text-on-background antialiased">
        <Toaster position="top-right" />
        {children}
      </body>
    </html>
  );
}

