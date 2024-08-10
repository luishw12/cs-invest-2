"use client";

import {useUser} from "@/context/UserContext";
import {useSession} from "next-auth/react";
import {Button, Form, Input, Variant, Width} from "design-system-toshyro";
import {toast} from "react-toastify";
import {useState} from "react";
import {axiosPrisma} from "../../../../axios";

export default function ModalRegister() {
  const [loading, setLoading] = useState<boolean>(false)
  const {data} = useSession();
  const {toggleRegister, getInfos} = useUser();

  if (!data) return <></>;

  function handleSubmit({...e}) {
    setLoading(true)
    axiosPrisma.post("/item/create", {
        userId: data!.user.id,
        sellTax: data!.user.sellTax,
        ...e
    })
      .then(() => {
        toast.success("Item criado com sucesso.")
        toggleRegister()
      })
      .finally(() => {
        setLoading(false)
        getInfos()
      })
  }

  return (
    <div className="absolute h-screen w-screen top-0 left-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <Form className="p-8 bg-white rounded-xl grid grid-cols-12 gap-5 dark:bg-slate-800 dark:text-slate-300">
        <h2 className="text-xl font-semibold text-center col-span-12">
          Cadastrar Item
        </h2>

        <Input
          name={"name"}
          label="Nome do item"
          className={"border-slate-700"}
          validation={{required: "Este campo é obrigatório"}}
          width={Width.SPAN_12}
        />
        <Input
          name={"buyPrice"}
          label="Valor da compra"
          type="number"
          className={"border-slate-700"}
          validation={{required: "Este campo é obrigatório"}}
          width={Width.SPAN_6}
        />
        <Input
          name={"sellPrice"}
          label="Valor da Venda"
          type="number"
          className={"border-slate-700"}
          width={Width.SPAN_6}
        />
        <div className="col-span-12 grid grid-cols-2 gap-5 mt-5">
          <Button
            onClick={() => toggleRegister()}
            variant={Variant.CANCEL}
            className={"dark:hover:bg-slate-700 dark:border-slate-700 dark:text-slate-200"}
            type="button"
            full
          >
            Cancelar
          </Button>
          <Button
            onSubmit={handleSubmit}
            className={"dark:hover:bg-blue-700 dark:bg-blue-800 dark:text-slate-200 border-transparent"}
            type="button"
            loading={loading}
            disabled={loading}
            full
          >
            Adicionar
          </Button>
        </div>
      </Form>
    </div>
  );
}