"use client"
import { ChakraProvider } from '@chakra-ui/react'
import Navbar from '@/components/Navbar'
import { Inter } from "next/font/google";

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ChakraProvider>
          <Navbar/>
          {children}
          </ChakraProvider>
      </body>
    </html>
  )
}
