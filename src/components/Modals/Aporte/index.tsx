"use client";
import ModalLayout from "../_Layout";
import {useUser} from "@/context/UserContext";
import {months} from "@/app/(pages)/dashboard/components/months";
import Form from "@/components/inputs/form";
import formatBrl from "@/components/formatBrl";
import Input from "@/components/inputs/input";
import Button from "@/components/inputs/button";
import {Variant} from "@/components/enum/variant";

export default function ModalAporte() {
  const {year, toggleAporte, monthSelected} = useUser();

  const aporte:any = []

  const selectedMonth = months.find(i => i.number == monthSelected)

  if (!open || !year) return;

  return (
    <ModalLayout toggle={toggleAporte} title={`Aporte de ${selectedMonth?.name}`}>
      <Form className="p-8 bg-white rounded-xl grid grid-cols-12 gap-5 min-w-[500px] dark:bg-slate-800">
        <h3 className={"col-span-12 text-center font-bold text-3xl my-4"}>{formatBrl(aporte)}</h3>
        <Input
          name={"aporte"}
          label="Aporte"
          type={"number"}
          width="col-span-12"
        />
        <div className={"col-span-4"}>
          <Button
            full
            type="button"
            variant={Variant.CANCEL}
            // onClick={}
          >
            +R$250,00
          </Button>
        </div>
        <div className={"col-span-4"}>
          <Button
            full
            type="button"
            variant={Variant.CANCEL}
            // onClick={}
          >
            +R$500,00
          </Button>
        </div>
        <div className={"col-span-4"}>
          <Button
            full
            type="button"
            variant={Variant.CANCEL}
            // onClick={}
          >
            +R$1.000,00
          </Button>
        </div>
        <div className={"col-span-6"}>
          <Button
            full
            type="button"
            // onSubmit={}
            color={"bg-red-500 hover:bg-red-600"}
          >
            Remover
          </Button>
        </div>
        <div className={"col-span-6"}>
          <Button
            full
            type="button"
            // onSubmit={}
            title={""}
          >
            Adicionar
          </Button>
        </div>
      </Form>
    </ModalLayout>
  );
}