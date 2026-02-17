import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { Toaster } from "sonner";

import LayoutWrapper from "@/components/LayoutWrapper";
import { FavoriteProvider } from "@/context/FavoriteContext";

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Campus Home",
  description:
    "Find your perfect stay with Campus Home - the ultimate student accommodation search platform.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${outfit.className} antialiased`}>
        <FavoriteProvider>
          <LayoutWrapper>{children}</LayoutWrapper>

          {/* Toast Notifications */}
          <Toaster position="top-center" richColors />
          <ToastContainer position="top-right" />
        </FavoriteProvider>
      </body>
    </html>
  );
}
