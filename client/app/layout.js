// app/layout.js
import "./globals.css";
import { Providers } from "@/app/Providers";
import Navbar from "@/app/(e-commerce)/component/Navbar"; // Apnar banano Navbar

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          {/* Main website-er navbar ekhane thakbe */}
          <Navbar /> 
          <main>
            {children}
          </main>
        </Providers>
      </body>
    </html>
  );
}