"use client";
import ModalLayout from "../_Layout";
import {useUser} from "@/context/UserContext";
import {months} from "@/app/(pages)/dashboard/components/months";
import formatBrl from "@/components/formatBrl";
import {Variant} from "@/components/enum/variant";
import {Button, ButtonProps, Form, Input, Width} from "design-system-toshyro";
import {useSession} from "next-auth/react";
import {Aporte} from "@prisma/client";
import {useEffect, useState} from "react";
import {toast} from "react-toastify";
import {Simulate} from "react-dom/test-utils";
import load = Simulate.load;
import {axiosPrisma} from "../../../../axios";

export default function ModalAporte() {
  const [aportes, setAportes] = useState<Aporte[]>();
  const [loading, setLoading] = useState<boolean>(false);

  const {data} = useSession();
  const {
    year,
    toggleAporte,
    currentDate
  } = useUser();

  useEffect(() => {
     getAportes()
  }, [data, currentDate]);

  const selectedMonth = months.find(i => i.number == currentDate?.month)

  function getAportes() {
    if(!currentDate) return;

    const params = new URLSearchParams({ dateId: currentDate.id });

    fetch(`/api/aporte/get/byDateId?${params}`)
      .then(data => {
        if(!data.ok) {
          toast.error("Falha ao encotrar aportes.")
          console.error(data.json())
          return;
        }
        return data.json()
      })
      .then(aportes => setAportes(aportes))
      .finally(() => setLoading(false))
  }

  function totalAportesValue() {
    if (!aportes) return formatBrl(0)
    const aporte =
      aportes.map(x => x.value)
        .reduce((x, y) => x + y, 0)

    return formatBrl(aporte)
  }

  function handleSubmit(e: any, remove?: boolean) {
    axiosPrisma.post("/aporte/create", {
        userId: data?.user.id,
        month: selectedMonth?.number,
        year,
        value: Number(e?.aporte) * (remove ? -1 : 1)
    })
      .then(() => {
        getAportes()
        toast.success("Aporte cadastrado com sucesso.")
      })
      .finally(() => setLoading(false))
  }

  return (
    <ModalLayout toggle={toggleAporte} title={`Aporte`}>
      <Form className="p-8 bg-white rounded-xl grid grid-cols-12 gap-5 min-w-[500px] dark:bg-slate-800">
        <h3 className={"col-span-12 text-center font-bold text-3xl my-4"}>{totalAportesValue()}</h3>
        <Input
          name={"aporte"}
          label="Aporte"
          type={"number"}
          width={Width.SPAN_12}
        />
        <div className={"col-span-4"}>
          <Button
            full
            disabled={loading}
            type="button"
            variant={Variant.CANCEL}
            onClick={() => handleSubmit({aporte: 250})}
          >
            +R$250,00
          </Button>
        </div>
        <div className={"col-span-4"}>
          <Button
            full
            disabled={loading}
            type="button"
            variant={Variant.CANCEL}
            onClick={() => handleSubmit({aporte: 500})}
          >
            +R$500,00
          </Button>
        </div>
        <div className={"col-span-4"}>
          <Button
            full
            disabled={loading}
            type="button"
            variant={Variant.CANCEL}
            onClick={() => handleSubmit({aporte: 1000})}
          >
            +R$1.000,00
          </Button>
        </div>
        <div className={"col-span-6"}>
          <Button
            full
            loading={loading}
            disabled={loading}
            type="button"
            onSubmit={e => handleSubmit(e, true)}
            className={"bg-red-500 hover:bg-red-600"}
          >
            Remover
          </Button>
        </div>
        <div className={"col-span-6"}>
          <Button
            full
            loading={loading}
            disabled={loading}
            type="button"
            onSubmit={e => handleSubmit(e)}
            title={""}
          >
            Adicionar
          </Button>
        </div>
      </Form>
    </ModalLayout>
  );
}