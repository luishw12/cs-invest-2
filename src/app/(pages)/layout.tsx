"use client";
import Navbar from "@/components/Navbar";
import DefaultLayoutInterface from "@/types/defaultLayoutInterface";
import {useSession} from "next-auth/react";
import {useRouter} from "next/navigation";
import {useEffect} from "react";

export default function LayoutPages({ children }: DefaultLayoutInterface) {
  return (
    <>
      <div className="h-full bg-gray-100 dark:bg-slate-800">
        <Navbar />
        <div className={"h-[calc(100%-82px)] flex items-center justify-center"}>
          {children}
        </div>
      </div>
    </>
  );
}
