import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { LangProvider } from "@/context/LanguageContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

/* ✅ GLOBAL SEO */
export const metadata: Metadata = {
  metadataBase: new URL("https://damarusfood.com"),

  title: {
    default: "Damarus Food Indonesia",
    template: "%s | Damarus Food",
  },

  description:
    "Damarus Food Indonesia menghadirkan camilan berkualitas dengan cita rasa khas Indonesia untuk pasar modern dan distribusi luas.",

  keywords: [
    "snack indonesia",
    "makanan ringan",
    "distributor snack",
    "camilan lokal",
    "damarus food",
    "snack manufacturer indonesia",
  ],

  authors: [{ name: "Damarus Food Indonesia" }],
  creator: "Damarus Food",
  publisher: "Damarus Food",

  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },

  openGraph: {
    title: "Damarus Food Indonesia",
    description: "Crafting quality snacks inspired by Indonesian flavors.",
    url: "https://damarusfood.com",
    siteName: "Damarus Food",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Damarus Food",
      },
    ],
    locale: "id_ID",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Damarus Food Indonesia",
    description: "Crafting quality snacks inspired by Indonesian flavors.",
    images: ["/og-image.jpg"],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <LangProvider>{children}</LangProvider>
      </body>
    </html>
  );
}
