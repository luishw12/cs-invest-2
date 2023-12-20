"use client";

import {useUser} from "@/context/UserContext";
import {useSession} from "next-auth/react";
import {Button, Form, Input, Variant, Width} from "design-system-toshyro";

export default function ModalRegister() {
  const {toggleRegister} = useUser();

  const {data} = useSession();

  if (!data) return <></>;

  return (
    <div className="absolute h-screen w-screen top-0 left-0 bg-black bg-opacity-30 flex items-center justify-center">
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
          validation={{required: "Este campo é obrigatório"}}
          width={Width.SPAN_6}
        />
        <div className="col-span-12 grid grid-cols-2 gap-5 mt-5">
          <Button
            onClick={toggleRegister}
            variant={Variant.CANCEL}
            className={"dark:hover:bg-slate-700 dark:border-slate-700 dark:text-slate-200"}
            type="button"
            full
          >
            Cancelar
          </Button>
          <Button
            // onSubmit={}
            className={"dark:hover:bg-blue-700 dark:bg-blue-800 dark:text-slate-200 border-transparent"}
            type="button"
            full
          >
            Adicionar
          </Button>
        </div>
      </Form>
    </div>
  );
}