"use client"
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "./utils/theme-provider";
import { Toaster } from "react-hot-toast";
import { Providers } from "./Provider";
import { SessionProvider } from "next-auth/react";
import { useLoadUserQuery } from "@/redux/feature/api/apiSlice";
import Loader from "./components/Loader/Loader";
import socketIO from 'socket.io-client'
import { useEffect } from "react";
const ENDPOINT = process.env.NEXT_PUBLIC_SERVER_URI || "";
const socketId = socketIO(ENDPOINT,{transports:['websocket']})

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-no-repeat !bg-white dark:bg-black duration-300`}
      >
        <Providers>
          <SessionProvider>
            <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
              <Custom>{children}</Custom>
              <Toaster position="top-center" reverseOrder={false} />
            </ThemeProvider>
          </SessionProvider>
        </Providers>
      </body>
    </html>
  );
}


const Custom: React.FC<{children:React.ReactNode}> = ({children}) =>{
  const {isLoading} = useLoadUserQuery({})

  useEffect(()=>{
    socketId.on("connection",()=>{})
  },[])

  return(
    <>
      {
        isLoading ? <Loader /> : <>{children}</>
      }
    </>
  )
}