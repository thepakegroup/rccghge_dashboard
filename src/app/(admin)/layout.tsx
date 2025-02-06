import Nav from "@/components/Nav";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Sidebar from "@/components/Sidebar";
import Toaster from "@/components/Toaster";
import SectionWrapper from "@/components/SectionWrapper";

const inter = Inter({ subsets: ["latin"] });

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
    <div className={`${inter.className}`}>
      <div className="md:flex">
        <Sidebar />
        <main className="w-full relative !overflow-y-scroll !overflow-x-hidden h-[100vh] scroll-pt-56 scroll-smooth">
          <Nav />
          <SectionWrapper>{children}</SectionWrapper>
        </main>
      </div>
      <Toaster />
    </div>
  );
}
