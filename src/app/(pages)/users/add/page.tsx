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
  const [plansOptions, setPlansOptions] = useState<AutocompleteOption[]>([]);

  const router = useRouter();

  useEffect(() => {
    getPlans()
  }, []);

  function getPlans() {
    axiosPrisma.get('/plan/get/all')
      .then(({data}) => setPlansOptions(data.map((plan: Plan) => {
        return {
          value: plan.id,
          label: `${plan.duration} meses - ${formatBrl(plan.price)}`,
        }
      })))
  }

  function handleSubmit({r_password, ...e}:any) {
    if (e.password !== r_password) return toast.error("As senhas deve ser idênticas.")

    setLoading(true)

    axiosPrisma.post("/user/create", {
      ...e
    })
      .then(() => {
        toast.success("Usuário criado com sucesso.")
        router.push("/users")
      })
      .finally(() => setLoading(false))
  }

  return (
    <Form
          className={"w-4/5 max-w-[1200px] rounded-lg overflow-hidden border border-slate-700 p-10 grid grid-cols-12 gap-5"}>
      <h1 className={"col-span-12 text-center text-2xl font-bold mb-10"}>Adicionar Usuário</h1>

      <Input name={"name"}
             label={"Nome"}
             width={Width.SPAN_5}
             placeholder={"Nome Sobrenome"}
             validation={{required: "Este campo é obrigatório."}}/>

      <Input name={"email"}
             label={"Email"}
             type={"email"}
             width={Width.SPAN_4}
             placeholder={"exemplo@email.com"}
             validation={{required: "Este campo é obrigatório."}}/>

      <Input name={"phone"}
             label={"Telefone"}
             width={Width.SPAN_3}
             placeholder={"(99) 99999-9999"}
             typeMask={"phone"}/>

      <Input name={"password"}
             label={"Senha"}
             type={"password"}
             width={Width.SPAN_6}
             validation={{required: "Este campo é obrigatório."}}/>

      <Input name={"r_password"}
             label={"Repetir Senha"}
             type={"password"}
             width={Width.SPAN_6}
             validation={{required: "Este campo é obrigatório."}}/>

      <Autocomplete name={"plan"}
                    label={"Plano"}
                    width={Width.SPAN_12}
                    options={plansOptions}
                    validation={{required: "Este campo é obrigatório."}}/>

      <div className={"col-span-12 mt-10 grid grid-cols-2 gap-5"}>
        <Button variant={Variant.CANCEL}
                type={"button"}
                onClick={()=> router.push("/users")}
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