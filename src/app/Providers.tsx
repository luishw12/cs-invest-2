"use client"

import DefaultLayoutInterface from "@/types/defaultLayoutInterface";
import {SessionProvider} from "next-auth/react";
import {ToastContainer} from "react-toastify";
import {UserContextProvider} from "@/context/UserContext";
import {NextUIProvider} from "@nextui-org/react";

export default function Providers({children}: DefaultLayoutInterface) {
  return (
    <SessionProvider>
      <UserContextProvider>
        <NextUIProvider>
          {children}
          <ToastContainer/>
        </NextUIProvider>
      </UserContextProvider>
    </SessionProvider>
  )
}