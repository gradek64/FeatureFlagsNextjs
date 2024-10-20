import type { Metadata } from "next";
import { ReactQueryProvider as ReactQueryProviderClientWrapper } from "@/providers/ReactQueryProvider";
import { AppContext } from "../context/ContextProvider";
import Head from "next/head";
import { Inter } from "next/font/google";
import "@/styles/globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <body className={inter.className}>
        <ReactQueryProviderClientWrapper>
          <AppContext>{children}</AppContext>
        </ReactQueryProviderClientWrapper>
      </body>
    </html>
  );
}
