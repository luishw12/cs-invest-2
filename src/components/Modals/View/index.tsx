"use client";

import { BiTrashAlt } from "react-icons/bi";
import { BsPencilSquare } from "react-icons/bs";

import React, {useState} from "react";
import ModalLayout from "../_Layout";
import Filter from "@/components/Modals/View/components/filter";
import {useUser} from "@/context/UserContext";
import {Table, TableCol, Td, Th} from "design-system-toshyro";
import {useSession} from "next-auth/react";
import {months} from "@/app/(pages)/dashboard/components/months";
import formatBrl from "@/components/formatBrl";
import {AntSwitch} from "design-system-toshyro/lib/compoments/inputs/Switch/antSwitch";

const columns: TableCol[] = [
  { name: "Nome" },
  { name: "Dia da compra", align: "center" },
  { name: "Valor Compra", align: "right" },
  { name: "Valor Venda", align: "right" },
  { name: "Vendido", align: "center" },
  { name: "Destaques", align: "center" },
  { name: "Lucro BRL", align: "right" },
  { name: "Lucro %", align: "center" },
  { name: "", align: "right" },
];

export default function ModalView() {
  const { monthSelected, toggleView, toggleEdit } = useUser();

  const {data} = useSession();

  const [loading, setLoading] = useState<boolean>(false);

  const viewItems: any = [];

  if (!data) return;

  const nameMonth = months.find((m) => m.number === monthSelected)?.name!;

  return (
    <ModalLayout title={`Seus Itens de ${nameMonth}`} qntItens={viewItems.length} toggle={toggleView} width={"w-[80%]"}>
      <>
        <Filter />
        <div className={"max-h-[calc(100vh-400px)] overflow-y-auto scrollbar-thin scrollbar-track-rounded-full scrollbar-thumb-rounded-full scrollbar-thumb-gray-400 scrollbar-track-gray-100 dark:scrollbar-thumb-slate-900 dark:scrollbar-track-gray-600"}>
          <Table columns={columns}>
          {viewItems.map((item: any, key: number) => {
            const buyDate = item.date && new Date(item.date.seconds * 1000);

            return (
              <tr key={key} className={"dark:bg-slate-800"}>
                <Th>
                  <button
                    onClick={() => {
                      // setDataItem(item);
                      toggleEdit();
                      toggleView();
                    }}
                  >
                    {item.name}
                  </button>
                </Th>
                <Td align="center">{buyDate ? `${buyDate.getDate()} / ${buyDate.getMonth() + 1}` : "-"}</Td>
                <Td align="right">{formatBrl(item.buyPrice)}</Td>
                <Td align="right">
                  {item.sellPrice ? formatBrl(item.sellPrice) : "-"}
                </Td>
                <Td align="center">
                  <div className="flex items-center gap-2 justify-center">
                    {!loading && <AntSwitch
                        defaultChecked={item.sold}
                        // onChange={}
                        inputProps={{ 'aria-label': 'ant design' }}
                    />}
                  </div>
                </Td>
                <Td align="center">
                  <div className="flex items-center gap-2 justify-between w-[90px]">
                    <button
                      type={"button"}
                      className={"h-4 w-4 rounded-md flex items-center justify-center text-red-500 font-bold bg-gray-300 dark:bg-slate-600 outline-none hover:ring-1 ring-red-500"}
                      // onClick={}
                    >
                      -
                    </button>
                    <div>{formatBrl(item.highlights ? typeof item.highlights == "boolean" ? 2 : item.highlights : 0)}</div>
                    <button
                      type={"button"}
                      className={"h-4 w-4 rounded-md flex items-center justify-center text-blue-500 font-bold bg-gray-300 dark:bg-slate-600 outline-none hover:ring-1 ring-blue-500"}
                      // onClick={}
                    >
                      +
                    </button>
                  </div>
                </Td>
                <Td align="right">
                  {item.sellPrice ? formatBrl(item.realProfit) : "-"}
                </Td>
                <Td align="center">
                  {item.sellPrice ? item.percentage + "%" : "-"}
                </Td>
                <Td align="right">
                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        // setDataItem(item);
                        toggleEdit();
                        toggleView();
                      }}
                      className="p-1.5 bg-orange-400 hover:bg-orange-500 rounded-md text-white"
                    >
                      <BsPencilSquare size={16} />
                    </button>
                    <button
                      // onClick={}
                      className="p-1.5 bg-red-500 hover:bg-red-600 rounded-md text-white"
                    >
                      <BiTrashAlt size={16} />
                    </button>
                  </div>
                </Td>
              </tr>
            );
          })}
        </Table>
        </div>
      </>
    </ModalLayout>
  );
}
