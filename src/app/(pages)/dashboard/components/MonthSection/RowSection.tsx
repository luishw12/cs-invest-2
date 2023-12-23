import React from "react";
import formatBrl from "@/components/formatBrl";
import classNames from "@/components/classNames";

export enum TypeRow {
  PERCENTAGE,
  MONEY
}

export interface RowSectionProps {
  title: string;
  type: TypeRow;
  profit?: boolean;
  value?: number;
  highlight?: boolean;
}
export default function RowSection({title, type, profit, value = 0,  highlight}:RowSectionProps) {
  const profitStyle = profit ?? value > 0

  function Value() {
    if (value === 0) return "-";
    switch (type) {
      case TypeRow.MONEY:
        return formatBrl(value)
      case TypeRow.PERCENTAGE:
        return `${value}%`
    }
  }

  function className() {
    const defaultClass = classNames(
      "text-right",
      highlight && "font-semibold"
    )

    if (value !== 0) {
      switch (type) {
        case TypeRow.MONEY:
          return classNames(defaultClass, profitStyle ? "text-green-500" : "text-red-500")
        case TypeRow.PERCENTAGE:
          return classNames(defaultClass, profitStyle ? "text-blue-500 dark:text-sky-300" : "text-orange-500")
      }
    }
    return classNames(defaultClass, "text-black dark:text-slate-300")
  }

  return (
    <div className="w-full grid grid-cols-2 whitespace-nowrap">
      <p>{title}</p>
      <p
        className={className()}
      >
        <Value />
      </p>
    </div>
  )
}