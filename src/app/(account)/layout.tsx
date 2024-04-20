"use client";

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import { Bolt, CircleUserRound, LogOut, StickyNote } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { deleteToken } from "@/helpers/Auth";
import { useRouter } from "next/navigation";
import { useAuth } from "@/helpers/Authorize";
import toast from "react-hot-toast";

import NavBar from "@/components/NavBar";

const inter = Inter({ subsets: ["latin"] });

// export const metadata: Metadata = {
//   title: "Create Next App",
//   description: "Generated by create next app",
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main>
      <NavBar />
      <section className={inter.className}>{children}</section>
    </main>
  );
}
