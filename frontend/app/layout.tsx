// app/layout.tsx
import type { Metadata } from "next";
import ClientLayout from "./clientLayout"; // Import the client component
export const metadata: Metadata = {
  title: "Rhyth",
  description: "Music Platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#000000" />
        <link rel="apple-touch-icon" href="/icons/icon-192x192.png" />
      </head>
      <body>
        {/* Render the client-side layout */}
        <ClientLayout>
          {children}
        </ClientLayout>
      </body>
    </html>
  );
}
