import Footer from "./common/Footer";
import Navbar from "./common/Navbar";

import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className={` ${inter.className}`}>
      <Navbar />
      <main className="px-24 py-12 flex min-h-screen flex-col items-center justify-between">
        {children}
      </main>
      <Footer />
    </div>
  );
}
