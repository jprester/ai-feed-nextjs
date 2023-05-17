import Footer from "./shared/footer";
import Navbar from "./shared/navbar";

import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div
      className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
    >
      <Navbar />
      <main>{children}</main>
      <Footer />
    </div>
  );
}
