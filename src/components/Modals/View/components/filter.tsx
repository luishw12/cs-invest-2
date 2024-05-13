"use client";
import {Button, Input, ResetForm, Select, Width} from "design-system-toshyro";
import {BiChevronDown} from "react-icons/bi";
import {FaFilter} from "react-icons/fa";
import {useState} from "react";
import {useUser} from "@/context/UserContext";

interface FilterProps {
  reload: () => void;
}
export default function Filter({reload}: FilterProps) {
  const [filterOpen, setFilterOpen] = useState<boolean>(true);
  const {viewFilter, currentFilterView} = useUser()

  function handleSearch({name, orderBy, direction, sold}: any) {
    viewFilter(name, {field: orderBy, direction: direction}, sold)
    reload();
  }

  return (
    <>
      <button onClick={() => setFilterOpen(!filterOpen)} className="py-2 px-4 flex items-center justify-between border-b border-t w-full dark:border-slate-600">
        <div className="flex items-center gap-3 text-sm">
          <FaFilter />
          <p>Filtro</p>
        </div>
        <BiChevronDown className={`duration-300 ${filterOpen ? "rotate-180" : ""}`} />
      </button>
      <ResetForm className={`overflow-hidden duration-300 ease-in-out grid grid-cols-12 items-center gap-4 px-4 ${filterOpen ? "max-h-32 border-b py-2 dark:border-slate-600" : "max-h-0"}`}>
        <Input label="Nome" name="name" width={Width.SPAN_4} defaultValue={currentFilterView?.name} />
        <Select label="Ordenar Por" name="orderBy" width={Width.SPAN_2} options={OrderByOptions} defaultValue={currentFilterView?.orderBy.field || OrderByOptions[0].value} />
        <Select label="Ordem" name="direction" width={Width.SPAN_2} options={DirectionOptions} defaultValue={currentFilterView?.orderBy.direction || DirectionOptions[0].value} />
        <Select label="Vendido" name="sold" width={Width.SPAN_2} options={SoldOptions} defaultValue={currentFilterView?.sold  || SoldOptions[0].value} />
        <div className="col-span-2 h-full flex justify-end items-end">
          <Button className={"text-sm"} onSubmit={handleSearch}>Pesquisar</Button>
        </div>
      </ResetForm>
    </>
  )
}

export enum SoldOptionsEnum {
  ALL = "0",
  SOLD = "1",
  NOT_SOLD = "2"
}

export const OrderByOptions = [
  { value: 'dateCreate', label: "Data" },
  { value: 'buyPrice', label: "Preço" },
]

export const DirectionOptions = [
  { value: "desc", label: "Decrescente" },
  { value: "asc", label: "Crescente" },
]

export const SoldOptions = [
  { label: "Todos", value: SoldOptionsEnum.ALL },
  { label: "Vendidos", value: SoldOptionsEnum.SOLD },
  { label: "Não Vendidos", value: SoldOptionsEnum.NOT_SOLD },
]
