"use client";

import {BiSolidEdit, BiTrash} from "react-icons/bi";

import React from "react";
import ModalLayout from "../_Layout";
import Filter from "@/components/Modals/View/components/filter";
import {useUser} from "@/context/UserContext";
import {Table, TableCol, Td, Th} from "design-system-toshyro";
import {useSession} from "next-auth/react";
import {months} from "@/app/(pages)/dashboard/components/months";
import formatBrl from "@/components/formatBrl";
import {AntSwitch} from "design-system-toshyro/lib/compoments/inputs/Switch/antSwitch";
import {toast} from "react-toastify";
import {axiosPrisma} from "../../../../axios";
import {LuUndo2} from "react-icons/lu";

const columns: TableCol[] = [
  {name: "Nome"},
  {name: "Dia da compra", align: "center"},
  {name: "Dia da venda", align: "center"},
  {name: "Valor Compra", align: "right"},
  {name: "Valor Venda", align: "right"},
  {name: "Destaques", align: "center"},
  {name: "Lucro BRL", align: "right"},
  {name: "Lucro %", align: "center"},
  {name: "", align: "right"},
];

export default function ModalView() {
  const {
    currentDate,
    currentItems,
    toggleView,
    toggleEdit,
    resetFilterView,
    getInfos,
  } = useUser();

  const {data} = useSession();

  if (!data || !currentItems) return;

  const nameMonth = months.find((m) => m.number === currentDate?.month)?.name!;

  async function handleDelete(itemId: string) {
    const response = confirm("Tem certeza que deseja excluir este item?")
    if (response) {
      axiosPrisma.delete("/item/delete", {
        params: {id: itemId}
      })
        .then(() => {
          toast.success("Item apagado.")
        })
        .finally(() => getInfos())
    }
  }

  function handleSetSold(itemId: string) {
    axiosPrisma.put("/item/setSold", {
      id: itemId
    })
      .then(() => {
        toast.success("Item editado.")
      })
      .finally(() => getInfos())
  }

  function handleRemoveSold(itemId: string) {
    axiosPrisma.put("/item/removeSold", {
      id: itemId
    })
      .then(() => {
        toast.success("Item editado.")
      })
      .finally(() => getInfos())
  }

  return (
    <ModalLayout title={`Seus Itens de ${nameMonth}`}
                 qntItens={currentItems.length}
                 toggle={() => {
                   toggleView()
                   resetFilterView()
                 }}
                 width={"w-[80%]"}>
      <>
        <Filter/>
        <div
          className={"max-h-[calc(100vh-400px)] overflow-y-auto scrollbar-thin scrollbar-track-rounded-full scrollbar-thumb-rounded-full scrollbar-thumb-gray-400 scrollbar-track-gray-100 dark:scrollbar-thumb-slate-900 dark:scrollbar-track-gray-600"}>
          <Table columns={columns}>
            {currentItems.map((item, key) => {
              const buyDate = new Date(String(item.dateCreate))
              const sellDate = item.dateSold && new Date(String(item.dateSold))

              const formatDate = (date: Date) => `${date.getMonth() + 1} / ${date.getFullYear().toString().replace("20", "")}`

              return (
                <tr key={key} className={"dark:bg-slate-800 dark:hover:bg-slate-700"}>
                  <Th>
                    <button
                      onClick={() => {
                        toggleEdit(item);
                        toggleView();
                      }}
                    >
                      {item.name}
                    </button>
                  </Th>
                  <Td align="center">
                    {formatDate(buyDate)}
                  </Td>
                  <Td align="center">
                    {sellDate
                      ? (
                        <button title={"Remover vendido"}
                                onClick={() => handleRemoveSold(item.id)}
                                className={"hover:text-red-500 hover:font-semibold duration-200 hover:scale-105"}>
                          {formatDate(sellDate)}
                        </button>
                      ) : (
                        <button onClick={() => handleSetSold(item.id)}
                                className={"bg-blue-600 font-semibold text-white rounded-md py-0.5 px-2 hover:bg-blue-500 hover:scale-105 duration-200"}>
                          Vendido
                        </button>)}
                  </Td>
                  <Td align="right">{formatBrl(item.buyPrice)}</Td>
                  <Td align="right">
                    {item.sellPrice ? formatBrl(item.sellPrice) : "-"}
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
                      <div>{formatBrl(item.highlights)}</div>
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
                    {item.sellPrice ? formatBrl(item.realProfit!) : "-"}
                  </Td>
                  <Td align="center">
                    {item.sellPrice ? item.percentage + "%" : "-"}
                  </Td>
                  <Td>
                    <div className="flex gap-2 justify-end">
                      <button
                        onClick={() => {
                          // setDataItem(item);
                          toggleEdit(item);
                          toggleView();
                        }}
                        className="h-7 w-7 flex items-center justify-center hover:bg-black hover:bg-opacity-10 rounded-md text-blue-400"
                      >
                        <BiSolidEdit size={18}/>
                      </button>
                      <button
                        onClick={async () => await handleDelete(item.id)}
                        className="h-7 w-7 flex items-center justify-center hover:bg-black hover:bg-opacity-10 rounded-md text-red-400"
                      >
                        <BiTrash size={18}/>
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
