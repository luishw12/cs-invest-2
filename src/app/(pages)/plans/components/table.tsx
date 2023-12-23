"use client"

import {Table, TableCol, Td, Th} from "design-system-toshyro";
import {useEffect, useState} from "react";
import {User} from "next-auth";
import {Role} from "@/types/enum/role";
import Link from "next/link";
import {HiPlusSm} from "react-icons/hi";
import {useSession} from "next-auth/react";
import {axiosPrisma} from "../../../../../axios";
import {Plan} from "@prisma/client";
import formatBrl from "@/components/formatBrl";

export default function TablePlans() {
  const {data} = useSession()
  const [loading, setLoading] = useState<boolean>(true);
  const [plans, setPlans] = useState<Plan[]>([]);

  useEffect(() => {
    getPlans()
  }, [data]);

  function getPlans() {
    setLoading(true);
    axiosPrisma.get('/plan/get/all')
      .then(({data}) => setPlans(data))
      .finally(() => setLoading(false))
  }

  const columns: TableCol[] = [
    {name: "Preço"},
    {name: "Período"},
  ]

  return (
    <div className={"w-4/5 max-w-[1200px] rounded-lg overflow-hidden border border-slate-500"}>
      <div className="grid grid-cols-12 border-b border-slate-500 text-sm">
        <p className="py-3 pl-5 font-medium text-medium col-span-10">
          Planos
        </p>
        <div className="flex items-center justify-end col-span-2">
          <Link
            prefetch
            href={"/plans/add"}
            className="bg-blue-600 mr-3 p-1 rounded-md hover:bg-blue-700 duration-150 flex items-center text-xs"
          >
            <HiPlusSm size={20}/>
          </Link>
        </div>
      </div>
      <Table columns={columns} loading={loading}>
        {plans.length > 0 ? plans.map((plan: any, key: number) => {
          return (
            <tr className={"dark:bg-slate-800 dark:hover:bg-slate-700"} key={key}>
              <Th>{formatBrl(plan.price)}</Th>
              <Td>{`${plan.duration} Meses`}</Td>
            </tr>
          )
        }) : <tr className={"dark:bg-slate-800 dark:hover:bg-slate-700"}>
          <Th align={"center"} span={100}>Nenhum resultado encontrado</Th>
        </tr>}
      </Table>
    </div>
  )
}
