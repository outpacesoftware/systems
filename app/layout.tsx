import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const interDisplay = localFont({
  src: [
    { path: "../public/fonts/InterDisplay-Regular.woff2", weight: "400" },
    { path: "../public/fonts/InterDisplay-Medium.woff2", weight: "500" },
    { path: "../public/fonts/InterDisplay-SemiBold.woff2", weight: "600" },
    { path: "../public/fonts/InterDisplay-Bold.woff2", weight: "700" },
  ],
  variable: "--font-display",
  display: "swap",
});

export const metadata: Metadata = {
  title: "@outpace/systems - AI-First Design System",
  description: "Opinionated, accessible, LLM-optimized components for React",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={`${interDisplay.variable} min-h-screen text-white/88 antialiased`}>
        {children}
      </body>
    </html>
  );
}
