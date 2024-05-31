import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "./components/Navbar";
import { Suspense } from "react";

export const metadata = {
  title: "Next.js",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Suspense fallback={<p>Loading...</p>}>
          <Navbar />
          {children}
        </Suspense>
      </body>
    </html>
  );
}
