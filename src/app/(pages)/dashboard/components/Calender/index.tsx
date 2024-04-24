"use client";

import {months} from "@/app/(pages)/dashboard/components/months";
import MonthSection from "@/app/(pages)/dashboard/components/MonthSection";
import {BsArrowLeftShort, BsArrowRightShort} from "react-icons/bs";
import {useUser} from "@/context/UserContext";
import classNames from "@/components/classNames";

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

      <div className={classNames(
        "grid w-full gap-5 p-10 pt-0",
        "2xl:grid-cols-4 2xl:grid-rows-3",
        "lg:grid-cols-3 lg:grid-rows-3",
        "sm:grid-cols-2 sm:grid-rows-2",
        "grid-cols-1 grid-rows-1",
      )}>
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