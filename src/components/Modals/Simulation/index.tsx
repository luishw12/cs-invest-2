"use client";
import ModalLayout from "../_Layout";
import React, { useState } from "react";
import { CgSpinnerTwo } from "react-icons/cg";
import {useUser} from "@/context/UserContext";
import {toast} from "react-toastify";
import formatBrl from "@/components/formatBrl";
import {useSession} from "next-auth/react";
import {Button, Form, Input, Width} from "design-system-toshyro";

export default function Simulation() {
  const [profit, setProfit] = useState<number>(0);
  const [percentage, setPercentage] = useState<number>(0);

  const [highlight, setHighlight] = useState<number>(0);

  const {toggleSimulation} = useUser();
  const {data} = useSession();

  return (
    <>
      <ModalLayout title={"Simule seu Lucro"} toggle={toggleSimulation}>
        <div className="p-5">
          <Form className="grid grid-cols-12 gap-5 min-w-[500px]">
            {data?.user ? (
              <>
                <Input
                  name={"buyPrice"}
                  label="Valor da compra"
                  width={Width.SPAN_6}
                />
                <Input
                  name={"sellPrice"}
                  label="Valor da venda"
                  width={Width.SPAN_6}
                />
                <div className="col-span-12 flex items-center justify-center gap-4">
                  <button
                    type={"button"}
                    className={"h-6 w-6 text-lg rounded-md flex items-center justify-center text-red-500 font-bold bg-gray-300 dark:bg-slate-600 outline-none hover:ring-1 ring-red-500"}
                    onClick={()=> {
                      if(highlight == 0) return toast.error("O Destaque não pode ser menor que R$ 0,00")
                      setHighlight(highlight - 2)
                    }}>
                    -
                  </button>
                  <p>{formatBrl(highlight)}</p>
                  <button
                    type={"button"}
                    className={"h-6 w-6 text-lg rounded-md flex items-center justify-center text-blue-500 font-bold bg-gray-300 dark:bg-slate-600 outline-none hover:ring-1 ring-blue-500"}
                    onClick={()=>setHighlight(highlight + 2)}>
                    +
                  </button>
                </div>
                <div className="col-span-6 flex items-center justify-between font-semibold">
                  <p>Lucro em BRL:</p>
                  <p
                    className={
                      profit > 0
                        ? "text-green-500"
                        : profit < 0
                        ? "text-red-500"
                        : ""
                    }
                  >
                    {profit != 0 ? formatBrl(profit) : "-"}
                  </p>
                </div>
                <div className="col-span-6 flex items-center justify-between font-semibold">
                  <p>Lucro em %:</p>
                  <p
                    className={
                      percentage > 0
                        ? "text-blue-500 dark:text-sky-300"
                        : percentage < 0
                        ? "text-red-500"
                        : ""
                    }
                  >
                    {percentage != 0 ? percentage + "%" : "-"}
                  </p>
                </div>
                <div className="col-span-12">
                  <Button
                    full
                    onSubmit={(e: any) => {
                      const sellPrice = e.sellPrice.replace(",", ".");
                      const buyPrice = e.buyPrice.replace(",", ".");
                      const prof = (Number(sellPrice) * (1 - data.user.sellTax) - Number(buyPrice)) - highlight;
                      const perc = Math.round((prof / Number(buyPrice)) * 10000) / 100;
                      setProfit(prof);
                      setPercentage(perc);
                    }}
                  >
                    Calcular
                  </Button>
                </div>
              </>
            ) : (
              <div className="col-span-12">
                <CgSpinnerTwo
                  className="animate-spin text-blue-800"
                  size={30}
                />
              </div>
            )}
          </Form>
        </div>
      </ModalLayout>
    </>
  );
}
