"use client";

import React from "react";
import { Bolt, CircleUserRound, LogOut, StickyNote } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { deleteToken } from "@/helpers/Auth";
import { useRouter } from "next/navigation";
import { useAuth } from "@/helpers/Authorize";
import toast from "react-hot-toast";
import User from "./User";

const NavBar = () => {
  const [dropdownVisibility, setDropdownVisibility] = useState(false);
  const router = useRouter();
  const { isAuthenticated, setIsAuthenticated } = useAuth();

  const logOut = () => {
    deleteToken();
    // router.push("/login");
    setIsAuthenticated(false);
    toast.success("You logged out successfully!");
  };
  return (
    <header className="w-full h-14 sm:h-20 bg-light flex items-center justify-between px-5 xl:px-20 sticky top-0 z-20 shadow">
      <Link
        href={"/"}
        className="h-full text-sm font-extralight cursor-pointer flex items-center text-light"
      >
        {/* <span className="text-light text-xl sm:text-2xl">Appendix 3</span>
        &nbsp;&nbsp;x&nbsp;&nbsp;
        <span className="font-extrabold text-2xl sm:text-3xl text-light">
          Blogs
        </span> */}
        <img src="/logo.png" alt="" className="h-[50%]" />
      </Link>
      <div className="relative">
        <span
          className="cursor-pointer"
          onClick={() => {
            setDropdownVisibility(!dropdownVisibility);
          }}
        >
          <CircleUserRound size={40} strokeWidth={1} color="#f1b143" />
          {/* <User size={"large"} /> */}
        </span>
        {dropdownVisibility && (
          <div className="w-max absolute top-16 -right-0 bg-light *:py-2 *:px-4 *:text-sm *:text-dark *:hover:cursor-pointer px-1 shadow rounded-md">
            <Link
              href={"/my-blogs"}
              onClick={() => {
                setDropdownVisibility(false);
              }}
              className="border-b border-gray-100 flex gap-x-2 items-center"
            >
              <StickyNote size={16} color="#f1b143" />
              My Blogs
            </Link>
            <div
              onClick={() => {
                setDropdownVisibility(false);
                logOut();
              }}
              className="flex gap-x-2 items-center"
            >
              <LogOut size={16} color="#f1b143" />
              LogOut
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default NavBar;
