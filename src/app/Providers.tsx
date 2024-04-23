"use client"

import DefaultLayoutInterface from "@/types/defaultLayoutInterface";
import {SessionProvider} from "next-auth/react";
import {ToastContainer} from "react-toastify";
import {UserContextProvider} from "@/context/UserContext";

export default function Providers({children}: DefaultLayoutInterface) {
  return (
    <SessionProvider>
      <UserContextProvider>
        {children}
        <ToastContainer stacked />
      </UserContextProvider>
    </SessionProvider>
  )
}