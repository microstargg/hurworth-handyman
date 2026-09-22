import type { Metadata } from "next";
import { Source_Sans_3, Zilla_Slab } from "next/font/google";
import "./globals.css";

const sourceSans = Source_Sans_3({
  variable: "--font-sans",
  subsets: ["latin"],
});

const zillaSlab = Zilla_Slab({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
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
    <html
      lang="en-GB"
      className={`${sourceSans.variable} ${zillaSlab.variable} h-full scroll-smooth`}
    >
      <body className="min-h-full bg-bg font-sans text-ink antialiased">
        {children}
      </body>
    </html>
  );
}
