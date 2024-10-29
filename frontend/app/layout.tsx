// app/layout.tsx
import type { Metadata } from "next";
import ClientLayout from "./clientLayout"; // Import the client component
import { TokenProvider } from "@/components/contexts/TokenContext";
import { cookies } from "next/headers";
export const metadata: Metadata = {
  title: "Rhyth",
  description: "Music Platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const nextCookies = cookies();
  const nextAuthSessionToken = nextCookies.get("___Secure-next-auth.session-token")?.value || null;
  return (
    <html lang="en">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#000000" />
        <link rel="apple-touch-icon" href="/icons/icon-192x192.png" />
      </head>
      <body>
        {/* Render the client-side layout */}
        <TokenProvider token={nextAuthSessionToken}>
        <ClientLayout>
          {children}
        </ClientLayout>
        </TokenProvider>
      </body>
    </html>
  );
}
