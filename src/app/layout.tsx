import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { AppProvider } from "@/components/Provider";
import { QueryProvider } from "@/components/providers/query-provider";
import localFont from "next/font/local";

const inter = Inter({ subsets: ["latin"] });

const quicksand = localFont({
  src: [
    {
      path: "../../public/fonts/Quicksand_Bold.otf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../../public/fonts/Quicksand_Bold_Oblique.otf",
      weight: "700",
      style: "italic",
    },
    {
      path: "../../public/fonts/Quicksand_Book_Oblique.otf",
      weight: "500",
      style: "italic",
    },
    {
      path: "../../public/fonts/Quicksand_Book.otf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../public/fonts/Quicksand_Light_Oblique.otf",
      weight: "300",
      style: "italic",
    },
    {
      path: "../../public/fonts/Quicksand_Light.otf",
      weight: "300",
      style: "normal",
    },
  ],
  variable: "--quicksand",
});

export const metadata: Metadata = {
  title: "RCCG HGE Dashboard",
  description: "RCCG HGE Dashboard",
  icons: {
    icon: "/favicon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} ${quicksand.variable}`}>
        <AppProvider>
          <QueryProvider>{children}</QueryProvider>
        </AppProvider>
      </body>
    </html>
  );
}
