"use client";
import {months} from "@/app/(pages)/dashboard/components/months";
import MonthSection from "@/app/(pages)/dashboard/components/MonthSection";
import {BsArrowLeftShort, BsArrowRightShort} from "react-icons/bs";
import {useUser} from "@/context/UserContext";

export default function Calender() {
  const { setYear, year } = useUser();

  return (
    <>
      <div className="p-6 flex items-center gap-4 dark:text-gray-300">
        <button onClick={() => setYear(year - 1)}>
          <BsArrowLeftShort
            className="hover:bg-gray-300 rounded-lg dark:hover:bg-slate-600"
            size={32}
          />
        </button>
        <p className="text-2xl font-semibold">{year}</p>
        <button onClick={() => setYear(year + 1)}>
          <BsArrowRightShort
            className="hover:bg-gray-300 rounded-lg dark:hover:bg-slate-600"
            size={32}
          />
        </button>
      </div>

      <div className="grid grid-cols-4 w-full h-full overflow-hidden gap-5">
        {months.map((month, i) => {
          return (
            <MonthSection
              key={i}
              title={month.name}
              number={month.number}
            />
          );
        })}
      </div>
    </>
  );
}