"use client";
import UserMenu from "./UserMenu";
import {BiSolidMoon, BiSun} from "react-icons/bi";
import Buttons from "./buttons";
import classNames from "@/components/classNames";
import programs from "@/components/programs";
import {useUser} from "@/context/UserContext";
import {allowedPaths} from "@/middleware";
import {useSession} from "next-auth/react";
import Link from "next/link";

export default function Navbar() {
  const {theme, toggleTheme} = useUser()
  const {data} = useSession();
  return (
    <>
      <nav className={classNames(
        "h-[82px] px-16 grid grid-cols-3 items-center border-b-2 border-gray-400 bg-white bg-opacity-25",
        "dark:bg-slate-900 dark:bg-opacity-25 dark:text-slate-300 dark:border-slate-300"
      )}>
        <div className="h-full flex items-center">
          <button onClick={()=> toggleTheme()}>
            {theme === "dark"
              ? <BiSolidMoon size={26} />
              : <BiSun size={26} />
            }
          </button>
        </div>

        <div className="flex gap-4 justify-center">
          {programs.map(page => {
            if(!data?.user) return <div key={page.id}></div>

            if (allowedPaths[data.user.role].includes(page.link)) {
              return (
                <Link
                  key={page.id}
                  href={page.link}
                  className="font-medium hover:bg-gray-300 px-3 py-2 rounded-lg dark:hover:bg-slate-700"
                >
                  {page.name}
                </Link>
              )
            }
          })}
        </div>

        <div className="h-full flex items-center justify-end gap-5">
          <Buttons />
          <UserMenu />
        </div>
      </nav>
    </>
  );
}
