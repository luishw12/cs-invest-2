"use client";
import React, {useEffect, useState} from "react";
import {AiOutlineDollarCircle, AiOutlineEye, AiOutlinePlusCircle} from "react-icons/ai";
import {CgSpinnerTwo} from "react-icons/cg";
import {months} from "@/app/(pages)/dashboard/components/months";
import classNames from "@/components/classNames";
import RowSection, {TypeRow} from "@/app/(pages)/dashboard/components/MonthSection/RowSection";
import {useUser} from "@/context/UserContext";
import {Date as DatePrisma, Item} from "@prisma/client";

interface RowInfos {
  averageProfit: number;
  percentage: number;
  inventoryPrice: number;
  profit: number
}

interface MonthSectionProps {
  title: string;
  number: number;
  items?: Item[];
  date?: DatePrisma;
}

export default function MonthSection({
                                       title,
                                       number,
                                       items,
                                       date,
                                     }: MonthSectionProps) {
  const {year, loading, toggleAporte, toggleView, toggleRegister} = useUser();
  const [rowsInfos, setRowsInfos] = useState<RowInfos>();

  useEffect(() => {
    getRowsInfos()
  }, [date, items, year]);

  const currentMonth = months.find(month => month.number === new Date().getMonth() + 1);
  const highlightSection = currentMonth?.number == number && year == new Date().getFullYear();

  function getRowsInfos() {
    let percentage = 0;
    let averageProfit = 0;
    let profit = 0;
    let inventoryPrice = 0;

    if (!date || !items) {
      setRowsInfos(undefined);
      return
    }

    const soldItems = items.filter(item => item.dateSold)
    const notSoldItems = items.filter(item => !item.dateSold)

    inventoryPrice = notSoldItems.reduce((x, y) => x + y.buyPrice, 0)

    if (soldItems.length > 0) {
      percentage = Math.round(soldItems.reduce((x, y) => x + y.percentage!, 0) / soldItems.length * 10) / 10
      averageProfit = soldItems.reduce((x, y) => x + y.realProfit!, 0) / soldItems.length
      profit = soldItems.reduce((x, y) => x + y.realProfit!, 0)
    }

    setRowsInfos({
      averageProfit,
      percentage,
      profit,
      inventoryPrice
    })
  }

  return (
    <div className={classNames(
      "rounded-xl overflow-hidden border-2 h-[220px]",
      highlightSection ? "dark:border-blue-800" : "dark:border-slate-700",
      highlightSection ? "border-blue-700" : "border-slate-700"
    )}
    >
      {/* Title */}
      <div
        className={classNames(
          "flex items-center text-lg justify-between px-3 py-1.5  text-white",
          highlightSection ? "dark:bg-blue-900" : "dark:bg-slate-800",
          highlightSection ? "font-bold bg-blue-700" : "font-normal bg-slate-700"
        )}
      >
        <p>{number}</p>
        <h5>{title}</h5>
        <div className="flex gap-2">
          <button
            className={"hover:text-green-400 duration-100 disabled:opacity-50 disabled:cursor-no-drop"}
            disabled={!date}
            onClick={() => {
              toggleAporte(date);
            }}
          >
            <AiOutlineDollarCircle size={20}/>
          </button>
          <button
            className={"hover:text-orange-400 duration-100 disabled:opacity-50 disabled:cursor-no-drop"}
            disabled={!items || items?.length == 0}
            onClick={() => {
              toggleView(date, items);
            }}
          >
            <AiOutlineEye size={20}/>
          </button>
          <button
            className={`${highlightSection ? "hover:text-blue-300" : "hover:text-blue-400"} duration-100`}
            onClick={() => {
              toggleRegister(date);
            }}
          >
            <AiOutlinePlusCircle size={20}/>
          </button>
        </div>
      </div>

      {/* Body */}
      <div
        className={classNames(
          "h-[calc(100%-40px)] flex flex-col justify-between p-4 bg-gray-200",
          "dark:bg-slate-700 dark:text-slate-200"
        )}>
        {!loading ? (
          <>
            <RowSection
              title={"Rendimento Médio"}
              type={TypeRow.MONEY}
              value={rowsInfos?.averageProfit}
            />
            <RowSection
              title={"Rentabilidade"}
              type={TypeRow.PERCENTAGE}
              value={rowsInfos?.percentage}
            />
            <RowSection
              title={"Valor Inventário"}
              profit={false}
              type={TypeRow.MONEY}
              value={rowsInfos?.inventoryPrice}
            />
            <RowSection
              title={"Lucro Total"}
              type={TypeRow.MONEY}
              value={rowsInfos?.profit}
              highlight
            />
          </>
        ) : (
          <div className="h-full flex justify-center items-center">
            <CgSpinnerTwo className="animate-spin" size={28}/>
          </div>
        )}
      </div>
    </div>
  );
}
