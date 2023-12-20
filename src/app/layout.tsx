import './globals.css'
import "react-toastify/dist/ReactToastify.css";
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Providers from "@/app/Providers";
import DefaultLayoutInterface from "@/types/defaultLayoutInterface";

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Cs Invest 2',
}

export default function RootLayout({
  children,
}: DefaultLayoutInterface) {
  return (
    <html lang="pt-br" className={"dark"}>
      <body className={inter.className}>
        <Providers>
          <div className={"h-screen overflow-y-auto"}>{children}</div>
        </Providers>
      </body>
    </html>
  )
}
