"use client";
import {Autocomplete, AutocompleteOption, Button, Form, Input, Variant, Width} from "design-system-toshyro";
import {useEffect, useState} from "react";
import {Plan} from "@prisma/client";
import formatBrl from "@/components/formatBrl";
import {toast} from "react-toastify";
import {useRouter} from "next/navigation";
import {axiosPrisma} from "../../../../../axios";

export default function AddUser() {
  const [loading, setLoading] = useState<boolean>(false);

  const router = useRouter();

  function handleSubmit({r_password, ...e}:any) {
    setLoading(true)

    axiosPrisma.post("/plan/create", {
      ...e
    })
      .then(() => {
        toast.success("Plano criado com sucesso.")
        router.push("/plans")
      })
      .finally(() => setLoading(false))
  }

  return (
    <Form
          className={"w-4/5 max-w-[1200px] rounded-lg overflow-hidden border border-slate-700 p-10 grid grid-cols-12 gap-5"}>
      <h1 className={"col-span-12 text-center text-2xl font-bold mb-10 dark:text-slate-200"}>Adicionar Plano</h1>

      <Input name={"duration"}
             label={"Duração (meses)"}
             width={Width.SPAN_6}
             validation={{required: "Este campo é obrigatório."}}/>

      <Input name={"price"}
             label={"Preço (BRL)"}
             width={Width.SPAN_6}
             validation={{required: "Este campo é obrigatório."}}/>

      <div className={"col-span-12 mt-10 grid grid-cols-2 gap-5"}>
        <Button variant={Variant.CANCEL}
                type={"button"}
                onClick={()=> router.push("/plans")}
                full>
          Voltar
        </Button>

        <Button full
                onSubmit={handleSubmit}
                disabled={loading}
                type={"button"}
                loading={loading}>
          Criar
        </Button>
      </div>

    </Form>
  )
}