"use client"

import DefaultLayoutInterface from "@/types/defaultLayoutInterface";
import {SessionProvider} from "next-auth/react";
import {ToastContainer} from "react-toastify";
import {UserContextProvider, useUser} from "@/context/UserContext";

export default function Providers({children}: DefaultLayoutInterface) {
  return (
    <SessionProvider>
      <UserContextProvider>
        {children}
        <Toast />
      </UserContextProvider>
    </SessionProvider>
  )
}

function Toast() {
  const {theme} = useUser()
  return (
    <ToastContainer stacked theme={theme} />
  )
}