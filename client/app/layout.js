


// app/layout.js

import Navbar from "./(e-commerce)/component/Navbar";
import "./globals.css";
import { Providers } from "@/app/Providers";

export const metadata = {
  title: "Admin Dashboard",
  description: "E-commerce Admin Panel",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navbar/>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}