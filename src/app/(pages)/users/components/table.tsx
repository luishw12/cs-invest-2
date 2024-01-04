"use client"

import {Table, TableCol, Td, Th} from "design-system-toshyro";
import {useEffect, useState} from "react";
import {User} from "next-auth";
import {Role} from "@/types/enum/role";
import Link from "next/link";
import {HiPlusSm} from "react-icons/hi";
import {useSession} from "next-auth/react";
import {axiosPrisma} from "../../../../../axios";

export default function TableUsers() {
  const {data} = useSession()
  const [loading, setLoading] = useState<boolean>(true);
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    getUsers()
  }, [data]);

  function getUsers() {
    setLoading(true);
    axiosPrisma.get('/user/get/all')
      .then(({data}) => setUsers(data))
      .finally(() => setLoading(false))
  }

  const columns: TableCol[] = [
    {name: "Nome"},
    {name: "Email"},
    {name: "Cargo", align: "center"},
    {name: "Status", align: "right"},
  ]

  return (
    <div className={"w-4/5 max-w-[1200px] rounded-lg overflow-hidden border border-slate-500"}>
      <div className="grid grid-cols-12 border-b border-slate-500 text-sm">
        <p className="py-3 pl-5 font-medium text-medium col-span-10 dark:text-slate-200">
          Usuários
        </p>
        <div className="flex items-center justify-end col-span-2">
          <Link
            prefetch
            href={"/users/add"}
            className="bg-blue-600 mr-3 p-1 rounded-md hover:bg-blue-700 duration-150 flex items-center text-xs text-slate-200"
          >
            <HiPlusSm size={20}/>
          </Link>
        </div>
      </div>
      <Table columns={columns} loading={loading}>
        {users.length > 0 ? users.map((user: any, key: number) => {
          return (
            <tr className={"dark:bg-slate-800 dark:hover:bg-slate-700"} key={key}>
              <Th>{user.name}</Th>
              <Td>{user.email}</Td>
              <Td align={"center"}>{user.role === Role.USER ? "Usuário" : "Admin"}</Td>
              <Td align={"right"}>
                {!user.dateExpire || new Date() < new Date(user.dateExpire) ? "Ativo" : "Inativo"}
              </Td>
            </tr>
          )
        }) : <tr className={"dark:bg-slate-800 dark:hover:bg-slate-700"}>
          <Th align={"center"} span={100}>Nenhum resultado encontrado</Th>
        </tr>}
      </Table>
    </div>
  )
}
