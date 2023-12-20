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
  profit: boolean;
  value: number;
  showValue: any;
}
export default function RowSection({title, type, profit, value, showValue}:RowSectionProps) {
  function Value() {
    if (!showValue) return "-";
    switch (type) {
      case TypeRow.MONEY:
        return formatBrl(value)
      case TypeRow.PERCENTAGE:
        return `${value}%`
    }
  }

  function className() {
    const defaultClass = "text-right"
    if (showValue) {
      switch (type) {
        case TypeRow.MONEY:
          return classNames(defaultClass, profit ? "text-green-600" : "text-red-600")
        case TypeRow.PERCENTAGE:
          return classNames(defaultClass, profit ? "text-blue-600 dark:text-sky-300" : "text-orange-600")
      }
    }
    return classNames(defaultClass, "text-black dark:text-slate-300")
  }

  return (
    <div className="w-full grid grid-cols-2">
      <p>{title}</p>
      <p
        className={className()}
      >
        <Value />
      </p>
    </div>
  )
}