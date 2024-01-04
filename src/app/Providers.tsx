"use client"

import DefaultLayoutInterface from "@/types/defaultLayoutInterface";
import {SessionProvider} from "next-auth/react";
import {ToastContainer} from "react-toastify";
import {UserContextProvider} from "@/context/UserContext";
import {hashPassword} from "@/pages/api/user/create";

export default function Providers({children}: DefaultLayoutInterface) {
  console.log(hashPassword("123"))
  return (
    <SessionProvider>
      <UserContextProvider>
        {children}
        <ToastContainer/>
      </UserContextProvider>
    </SessionProvider>
  )
}