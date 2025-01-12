import type { Metadata } from "next";
import ClientLayout from "./clientLayout"; 
import { TokenProvider } from "@/components/contexts/TokenContext";
import { cookies } from "next/headers";
import { Analytics } from "@vercel/analytics/react"
import { Nunito } from "next/font/google";
export const metadata: Metadata = {
  title: "Rhyth",
  description: "Music Platform",
};


const Nunitomono = Nunito({
  variable: "--font-nunito-mono",
  subsets: ["latin"],
});


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const nextCookies = cookies();
  const tokenName = process.env.NODE_ENV === "production"
    ? "__Secure-next-auth.session-token"
    : "next-auth.session-token";
  const nextAuthSessionToken = nextCookies.get(tokenName)?.value || null;
  return (
    <html lang="en">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#000000" />
        <link rel="apple-touch-icon" href="/icons/icon-192x192.png" />
      </head>
      <body className={`${Nunitomono.variable} antialiased`}>

       <TokenProvider token={nextAuthSessionToken}>
        <ClientLayout>
        <div className="max-h-[calc(100vh-9rem)] min-h-[calc(100vh-9rem)]  w-full">
          {children}
          <Analytics/>
          </div>
        </ClientLayout>
        </TokenProvider>
      </body>
    </html>
  );
}
