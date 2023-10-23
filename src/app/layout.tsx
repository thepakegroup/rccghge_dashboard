"use client";

import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { AppProvider } from "@/components/Provider";
import { useEffect } from "react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // const clearCacheData = () => {
  //   caches.keys().then((names) => {
  //     names.forEach((name) => {
  //       caches.delete(name);
  //     });

  //     console.log("cache cleared");
  //   });
  // };

  // useEffect(() => {
  //   // Run the clearCacheData function on every render
  //   clearCacheData();

  //   // Set up a timer to call the function every 3 seconds
  //   const intervalId = setInterval(clearCacheData, 3000); // 3000 milliseconds = 3 seconds

  //   // Clean up the interval when the component unmounts
  //   return () => clearInterval(intervalId);
  // }, []);

  return (
    <html lang="en">
      <body className={`${inter.className}`}>
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  );
}
