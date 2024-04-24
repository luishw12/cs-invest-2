"use client";
import React, {createContext, Dispatch, SetStateAction, useContext, useEffect, useState} from "react";
import Simulation from "@/components/Modals/Simulation";
import Configurations from "@/components/Modals/Configurations";
import ModalAporte from "@/components/Modals/Aporte";
import ModalRegister from "@/components/Modals/Register";
import ModalView from "@/components/Modals/View";
import ModalUpdate from "@/components/Modals/Update";
import {Date as DatePrisma, Item} from "@prisma/client";
import {SoldOptionsEnum} from "@/components/Modals/View/components/filter";
import {axiosPrisma} from "../../../axios";
import {Date as PrismaDate} from ".prisma/client";
import {useSession} from "next-auth/react";

type UserContextProps = {
  theme: string;
  loading: boolean;
  year: number;
  dates?: DatePrisma[];
  items?: Item[];
  currentDate?: DatePrisma;
  currentItem?: Item;
  currentItems?: Item[];
  currentFilterView?: { name: string, orderBy: any, sold: SoldOptionsEnum };
  setLoading: Dispatch<SetStateAction<boolean>>;
  setYear: Dispatch<SetStateAction<number>>;
  toggleSimulation: () => void;
  toggleConfig: () => void;
  toggleAporte: (date?: DatePrisma) => void;
  toggleRegister: (date?: DatePrisma) => void;
  toggleView: (date?: DatePrisma, items?: Item[]) => void;
  toggleEdit: (item?: Item) => void;
  toggleTheme: () => void;
  viewFilter: (name: string, orderBy: { field: string, direction: "asc" | "desc" }, sold: SoldOptionsEnum) => void;
  resetFilterView: () => void;
  getInfos: () => void;
};

export const UserContext = createContext({} as UserContextProps);
export const useUser = () => useContext(UserContext);

type UserContextProviderProps = {
  children: React.ReactNode;
};

export function UserContextProvider({children}: UserContextProviderProps) {
  const {data} = useSession();

  const [loading, setLoading] = useState<boolean>(true);

  const [theme, setTheme] = useState<string>("dark")

  const [year, setYear] = useState<number>(new Date().getFullYear());

  const [dates, setDates] = useState<PrismaDate[]>();
  const [items, setItems] = useState<Item[]>();

  const [currentDate, setCurrentDate] = useState<DatePrisma>();
  const [currentItemsBackup, setCurrentItemsBackup] = useState<Item[]>();
  const [currentItems, setCurrentItems] = useState<Item[]>();
  const [currentItem, setCurrentItem] = useState<Item>();
  const [currentFilterView, setCurrentFilterView] = useState<{ name: string, orderBy: any, sold: SoldOptionsEnum }>();

  const [openSimulation, setOpenSimulation] = useState<boolean>(false);
  const [openConfig, setOpenConfig] = useState<boolean>(false);
  const [openAporte, setOpenAporte] = useState<boolean>(false);
  const [openRegister, setOpenRegister] = useState<boolean>(false);
  const [openView, setOpenView] = useState<boolean>(false);
  const [openEdit, setOpenEdit] = useState<boolean>(false);

  useEffect(() => {
    getInfos()

    const localTheme = localStorage.getItem("theme");
    if (localTheme === "light" || localTheme === "dark") {
      setTheme(localTheme);
      return;
    }
    localStorage.setItem("theme", theme!)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, year]);

  useEffect(() => {
    if (!currentFilterView) {
      const saveItems = items?.sort((a: any, b: any) => {
        return a.dateCreate > b.dateCreate ? 1 : -1;
      })

      setCurrentItems(saveItems)
      return;
    }
    viewFilter(currentFilterView.name, currentFilterView.orderBy, currentFilterView.sold)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items]);

  useEffect(() => {
    const localTheme = localStorage.getItem("theme")

    const root = document.documentElement;
    const themes = ["light", "dark"];

    root.classList.remove(...themes);

    root.classList.add(localTheme || "dark");

    setTheme(localTheme || "dark")
  }, []);

  const toggleSimulation = () => setOpenSimulation(!openSimulation);
  const toggleConfig = () => setOpenConfig(!openConfig);
  const toggleAporte = (date?: DatePrisma) => {
    setOpenAporte(!openAporte);
    setCurrentDate(date);
  }
  const toggleRegister = (date?: DatePrisma) => {
    setOpenRegister(!openRegister);
    setCurrentDate(date);
  }
  const toggleView = (date?: DatePrisma, items?: Item[]) => {
    setOpenView(!openView);
    setCurrentDate(date);
    setCurrentItems(items);
    setCurrentItemsBackup(items);
  }
  const toggleEdit = (item?: Item) => {
    setOpenEdit(!openEdit);
    setCurrentItem(item);
  }
  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";

    const root = document.documentElement;
    const themes = ["light", "dark"];

    root.classList.remove(...themes);

    root.classList.add(newTheme);
    localStorage.setItem("theme", newTheme);

    setTheme(newTheme)
  }

  const viewFilter = (name: string = "",
                      orderBy: {
                        field: string,
                        direction: "asc" | "desc"
                      },
                      sold: SoldOptionsEnum) => {
    let filteredItems: Item[] | undefined = currentItemsBackup;

    // Filtro pelo nome
    filteredItems = filteredItems?.filter(item => item.name.toLowerCase().includes(name.toLowerCase()))

    // Filtro pelo orderBy
    if (filteredItems) {
      filteredItems = filteredItems.sort((a: any, b: any) => {
        if (orderBy.direction === "asc") {
          return a[orderBy.field] > b[orderBy.field] ? 1 : -1;
        }
        return a[orderBy.field] < b[orderBy.field] ? 1 : -1;
      })
    }

    // Filtro pelo sold
    filteredItems = filteredItems?.filter(item => {
      switch (sold) {
        case SoldOptionsEnum.NOT_SOLD:
          return !item.dateSold
        case SoldOptionsEnum.SOLD:
          return item.dateSold
        default:
          return true
      }
    })

    setCurrentFilterView({name, orderBy, sold})
    setCurrentItems(filteredItems)
  }
  const resetFilterView = () => {
    setCurrentFilterView(undefined);
  }

  function getInfos() {
    if (!data) return;

    setLoading(true)
    axiosPrisma.get("/date/get/byDate", {
      params: {year: String(year)}
    })
      .then(({data}) => setDates(data))

    const params: any = {userId: data.user.id}
    axiosPrisma.get("/item/get/byUserId", {
      params
    })
      .then(({data}) => setItems(data))
      .finally(() => setLoading(false))
  }

  return (
    <UserContext.Provider
      value={{
        loading,
        year,
        dates,
        items,
        currentDate,
        currentItem,
        currentItems,
        currentFilterView,
        theme,
        setLoading,
        setYear,
        toggleSimulation,
        toggleConfig,
        toggleAporte,
        toggleRegister,
        toggleView,
        toggleEdit,
        toggleTheme,
        viewFilter,
        resetFilterView,
        getInfos,
      }}
    >
      {openSimulation && <Simulation/>}

      {openConfig && <Configurations/>}

      {openAporte && <ModalAporte/>}

      {openRegister && <ModalRegister/>}

      {openView && <ModalView/>}

      {openEdit && <ModalUpdate/>}

      {children}
    </UserContext.Provider>
  );
}
