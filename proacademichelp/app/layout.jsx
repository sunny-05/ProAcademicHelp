// app/layout.jsx
import "./globals.css";
import Navbar from "@/components/Navbar";

export const metadata = {
  title: "ProAcademicHelp",
  description: "Ace your assignments with ProAcademicHelp",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="overflow-x-hidden">
      <body className="relative overflow-x-hidden">   {/* ⬅️ add this */}
        <header
          id="site-header"
          className="fixed inset-x-0 top-0 z-50 bg-black shadow-md"
        >
          <Navbar />
        </header>

        <main className="relative z-10 pt-16 overflow-x-hidden"> {/* ⬅️ add this */}
          {children}
        </main>
      </body>
    </html>
  );
}
