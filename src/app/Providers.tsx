"use client"

import DefaultLayoutInterface from "@/types/defaultLayoutInterface";
import {SessionProvider} from "next-auth/react";
import {ToastContainer} from "react-toastify";
import {UserContextProvider, useUser} from "@/context/UserContext";

export default function Providers({children}: DefaultLayoutInterface) {
  const {theme} = useUser()
  return (
    <SessionProvider>
      <UserContextProvider>
        {children}
        <ToastContainer stacked theme={theme} />
      </UserContextProvider>
    </SessionProvider>
  )
}