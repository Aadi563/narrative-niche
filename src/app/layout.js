import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/app/components/Navbar";
import Footer from "./components/Footer";
import SessionWrapper from "./components/SessionWrapper";
import NextTopLoader from "nextjs-toploader";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Narrative Niche",
  description: "Your Own Blogging App!",
};

export default function RootLayout({ children }) {
  return (
    <SessionWrapper>
      <html lang="en">
        <body className={`${inter.className} py-10 animate-gradient-x h-full w-full bg-gradient-to-r from-slate-200 to-slate-500 dark:bg-gradient-to-r dark:from-gray-600 dark:to-gray-900 text-slate-800 dark:text-slate-300`}>
          <NextTopLoader
            color="red"
            initialPosition={0.08}
            crawlSpeed={200}
            height={3}
            crawl={true}
            showSpinner={true}
            easing="ease"
            speed={200}
            shadow="0 0 10px #2299DD,0 0 5px #2299DD"
            template='<div class="bar" role="bar"><div class="peg"></div></div> 
  <div class="spinner" role="spinner"><div class="spinner-icon"></div></div>'
            zIndex={1600}
            showAtBottom={false}
          />
          <Navbar />
          {children}
          <Footer />
        </body>
      </html>
    </SessionWrapper>
  );
}
