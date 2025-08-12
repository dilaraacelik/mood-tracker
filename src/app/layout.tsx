import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { ToastContainer } from "react-toastify";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-poppins",
}); 

export const metadata: Metadata = {
  title: "Mood Tracker",
  description: "Track your mood to feel better",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={poppins.variable} >
      <body className="font-sans">
        {children}
         <ToastContainer position="top-center" autoClose={3000} />
        </body>
    </html>
  );
}
