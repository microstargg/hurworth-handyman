import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Hurworth Handyman | Repairs, Maintenance & Renovation Management",
  description:
    "Reliable handyman services and rental property renovation project management in Hurworth and surrounding areas.",
  icons: {
    icon: "/favicon.svg",
  },
  openGraph: {
    title: "Hurworth Handyman",
    description:
      "Reliable handyman services and rental property renovation project management in Hurworth and surrounding areas.",
    type: "website",
    locale: "en_GB",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-GB" className={`${plusJakarta.variable} h-full scroll-smooth`}>
      <body className="min-h-full bg-slate-950 font-sans text-slate-100 antialiased">
        {children}
      </body>
    </html>
  );
}
