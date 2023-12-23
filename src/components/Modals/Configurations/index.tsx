"use client";
import ModalLayout from "../_Layout";
import { useState } from "react";
import {useUser} from "@/context/UserContext";
import {useSession} from "next-auth/react";
import {Button, Form, Input, Width} from "design-system-toshyro";
import {toast} from "react-toastify";
import {axiosPrisma} from "../../../../axios";

export default function Configurations() {
  const [loading, setLoading] = useState<boolean>(false);

  const {toggleConfig} = useUser();

  const {data, update} = useSession();

  if (!data) return <></>

  function handleSubmit({sellTax, ...e}: any) {
    setLoading(true);

    axiosPrisma.put("/user/edit", {
        id: data?.user.id,
        sellTax: sellTax / 100,
        ...e
    })
      .then(() => {
        toast.success("Informações alteradas.")
        update({
          user: {
            name: e.name,
            email: e.email,
            phone: e.phone,
            sellTax: e.sellTax,
            sheets: e.sheets,
          }
        })
      })
      .finally(() => setLoading(false))
  }

  return (
    <>
      <ModalLayout title={"Configurações"} toggle={toggleConfig}>
        <div className="p-5">
          <Form className="grid grid-cols-12 gap-5 min-w-[500px]">
            <Input
              name={"name"}
              label="Nome"
              validation={{ required: "Este campo é obrigatório" }}
              defaultValue={data.user.name!}
              width={Width.SPAN_12}
            />
            <Input
              name={"email"}
              label="Email"
              validation={{ required: "Este campo é obrigatório" }}
              defaultValue={data.user.email!}
              width={Width.SPAN_12}
            />
            <Input
              name={"phone"}
              label="Telefone"
              mask="(99) 99999-9999"
              placeholder="(99) 99999-9999"
              width={Width.SPAN_6}
              defaultValue={data.user.phone!}
            />
            <div className="col-span-6 relative">
              <Input
                name={"sellTax"}
                label="Taxa de venda"
                mask="99"
                validation={{ required: "Este campo é obrigatório" }}
                defaultValue={data.user.sellTax * 100}
                width={Width.SPAN_12}
              />
              <div className="absolute bottom-0 right-0 font-bold text-lg h-[40px] flex items-center mr-2.5 text-gray-500 dark:text-slate-200">
                %
              </div>
            </div>
            <Input
              name={"sheets"}
              label="Link Planilha"
              defaultValue={data.user.sheets}
              width={Width.SPAN_12}
            />
            <div className="col-span-12">
              <Button
                onSubmit={handleSubmit}
                loading={loading}
                disabled={loading}
                full
              >
                Salvar
              </Button>
            </div>
          </Form>
        </div>
      </ModalLayout>
    </>
  );
}
