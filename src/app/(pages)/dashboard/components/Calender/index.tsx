"use client";

import {months} from "@/app/(pages)/dashboard/components/months";
import MonthSection from "@/app/(pages)/dashboard/components/MonthSection";
import {BsArrowLeftShort, BsArrowRightShort} from "react-icons/bs";
import {useUser} from "@/context/UserContext";
import {useEffect, useState} from "react";
import {useSession} from "next-auth/react";

export default function Calender() {
  const {setYear, year, dates, items} = useUser();

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

      <div className="grid grid-cols-4 w-full h-full gap-5">
        {months.map((month, i) => {
          const sectionDate = dates?.find(date => date.month == month.number && date.year == year);
          const sectionItems = items?.filter(item => item.dateId == sectionDate?.id)

          return (
            <MonthSection key={i}
                          title={month.name}
                          items={sectionItems}
                          date={sectionDate}
                          number={month.number}/>
          );
        })}
      </div>
    </>
  );
}