"use client";
import React, {createContext, Dispatch, SetStateAction, useContext, useEffect, useState} from "react";
import Simulation from "@/components/Modals/Simulation";
import Configurations from "@/components/Modals/Configurations";
import ModalAporte from "@/components/Modals/Aporte";
import ModalRegister from "@/components/Modals/Register";
import ModalView from "@/components/Modals/View";
import ModalUpdate from "@/components/Modals/Update";

type UserContextProps = {
  theme: "dark" | "light";
  year: number;
  monthSelected: number | undefined;
  editItem: any;
  setYear:  Dispatch<SetStateAction<number>>;
  toggleSimulation: () => void;
  toggleConfig: () => void;
  toggleAporte: () => void;
  toggleRegister: () => void;
  toggleView: () => void;
  toggleEdit: () => void;
  toggleTheme: () => void;
  setMonthSelected: Dispatch<SetStateAction<number | undefined>>;
  setEditItem: Dispatch<SetStateAction<any>>;
};

export const UserContext = createContext({} as UserContextProps);
export const useUser = () => useContext(UserContext);

type UserContextProviderProps = {
  children: React.ReactNode;
};

export function UserContextProvider({ children }: UserContextProviderProps) {
  const [theme, setTheme] = useState<"dark" | "light">("dark")

  const [year, setYear] = useState<number>(new Date().getFullYear());

  const [monthSelected, setMonthSelected] = useState<number>();

  const [openSimulation, setOpenSimulation] = useState<boolean>(false);
  const [openConfig, setOpenConfig] = useState<boolean>(false);
  const [openAporte, setOpenAporte] = useState<boolean>(false);
  const [openRegister, setOpenRegister] = useState<boolean>(false);
  const [openView, setOpenView] = useState<boolean>(false);
  const [openEdit, setOpenEdit] = useState<boolean>(false);

  const [editItem, setEditItem] = useState<any>();

  useEffect(() => {
    const localTheme =  localStorage.getItem("theme");
    if (localTheme === "light" || localTheme === "dark") {
      setTheme(localTheme);
      return;
    }
    localStorage.setItem("theme", theme)
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    const themes = ["light", "dark"];

    root.classList.remove(...themes);

    root.classList.add(theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleSimulation = () => setOpenSimulation(!openSimulation);
  const toggleConfig = () => setOpenConfig(!openConfig);
  const toggleAporte = () => setOpenAporte(!openAporte);
  const toggleRegister = () => setOpenRegister(!openRegister);
  const toggleView = () => setOpenView(!openView);
  const toggleEdit = () => setOpenEdit(!openEdit);

  const toggleTheme = () => console.log(theme === "light" ? "dark" : "light")

  return (
    <UserContext.Provider
      value={{
        year,
        monthSelected,
        editItem,
        theme,
        setYear,
        toggleSimulation,
        toggleConfig,
        toggleAporte,
        toggleRegister,
        toggleView,
        toggleEdit,
        setMonthSelected,
        setEditItem,
        toggleTheme,
      }}
    >
      {openSimulation && <Simulation />}

      {openConfig && <Configurations />}

      {openAporte && <ModalAporte />}

      {openRegister && <ModalRegister />}

      {openView && <ModalView />}

      {openEdit && <ModalUpdate />}

      {children}
    </UserContext.Provider>
  );
}
