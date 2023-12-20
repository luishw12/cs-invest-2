"use client";
import React, {useState} from "react";
import {AiOutlineDollarCircle, AiOutlineEye, AiOutlinePlusCircle} from "react-icons/ai";
import {CgSpinnerTwo} from "react-icons/cg";
import {toast} from "react-toastify";
import {months} from "@/app/(pages)/dashboard/components/months";
import classNames from "@/components/classNames";
import RowSection, {TypeRow} from "@/app/(pages)/dashboard/components/MonthSection/RowSection";
import {useUser} from "@/context/UserContext";

interface MonthSectionProps {
  title: string;
  number: number;
}

export default function MonthSection({
                                       title,
                                       number,
                                     }: MonthSectionProps) {
  const { year, toggleAporte, toggleView, toggleRegister, setMonthSelected } = useUser();
  const [loading, setLoading] = useState<boolean>(false);

  const monthInfos: any = [];
  const investedAmount = 0
  const profit = 0
  const percentage = 0
  const income = 0

  const month = months.find(month => month.number === number);

  const currentMonth = months.find(month => month.number === new Date().getMonth() + 1);
  const highlightSection = currentMonth?.number == number && year == new Date().getFullYear();

  return (
    <div className={classNames(
      "rounded-xl overflow-hidden border-2",
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
            className={"hover:text-green-400 duration-100"}
            onClick={() => {
              toggleAporte();
              setMonthSelected(number);
            }}
          >
            <AiOutlineDollarCircle size={20}/>
          </button>
          <button
            className={"hover:text-orange-400 duration-100"}
            onClick={() => {
              if (!monthInfos) return;
              if (monthInfos.length === 0)
                return toast.info(
                  `Você ainda não possui items cadastrados em ${month?.name}`
                );
              toggleView();
              setMonthSelected(number);
            }}
          >
            <AiOutlineEye size={20}/>
          </button>
          <button
            className={`${highlightSection ? "hover:text-blue-300" : "hover:text-blue-400"} duration-100`}
            onClick={() => {
              toggleRegister();
              setMonthSelected(number);
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
              showValue={investedAmount || profit}
              profit={income > 0}
              type={TypeRow.PERCENTAGE}
              value={income}
            />
            <RowSection
              title={"Rentabilidade"}
              showValue={investedAmount || profit}
              profit={percentage > 0}
              type={TypeRow.PERCENTAGE}
              value={percentage}
            />
            <RowSection
              title={"Valor Inventário"}
              showValue={investedAmount !== 0}
              profit={false}
              type={TypeRow.MONEY}
              value={investedAmount}
            />
            <RowSection
              title={"Lucro Total"}
              showValue={profit !== 0}
              profit={profit > 0}
              type={TypeRow.MONEY}
              value={profit}
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
