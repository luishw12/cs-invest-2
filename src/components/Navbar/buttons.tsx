import {LuCalculator} from "react-icons/lu";
import Link from "next/link";
import {SiGooglesheets} from "react-icons/si";
import {SlCalculator} from "react-icons/sl";
import {useUser} from "@/context/UserContext";
import {useSession} from "next-auth/react";

export default function Buttons() {
  const {toggleSimulation} = useUser();
  const {data} = useSession();

  return (
    <div className={"flex"}>
      <button
        onClick={toggleSimulation}
        className="flex items-center gap-3 px-4 py-3 hover:bg-gray-200 rounded-md dark:hover:bg-slate-700"
      >
        <LuCalculator size={20}/>
      </button>
      {data?.user.sheets && (
        <Link
          href={data.user.sheets}
          target="_blank"
          className="flex items-center gap-3 text-green-700 px-4 py-3 hover:bg-gray-200 w-full rounded-md dark:hover:bg-slate-700"
        >
          <SiGooglesheets size={20}/>
        </Link>
      )}
      <Link
        href={"https://www.mobills.com.br/calculadoras/calculadora-juros-compostos/"}
        target="_blank"
        className="flex items-center gap-3 px-4 py-3 hover:bg-gray-200 rounded-md dark:hover:bg-slate-700"
      >
        <SlCalculator size={20}/>
      </Link>
    </div>
  )
}