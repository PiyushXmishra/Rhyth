// app/layout.tsx
import type { Metadata } from "next";
import ClientLayout from "./clientLayout"; // Import the client component
import { TokenProvider } from "@/components/contexts/TokenContext";
import { cookies } from "next/headers";
import { Analytics } from "@vercel/analytics/react"
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
  const nextAuthSessionToken = nextCookies.get("__Secure-next-auth.session-token")?.value || null;
  console.log(nextAuthSessionToken)
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
          <Analytics/>
        </ClientLayout>
        </TokenProvider>
      </body>
    </html>
  );
}
