"use client";
import ModalLayout from "../_Layout";
import { useState } from "react";
import { CgSpinnerTwo } from "react-icons/cg";
import {useUser} from "@/context/UserContext";
import {useSession} from "next-auth/react";
import {Button, Form, Input, Width} from "design-system-toshyro";

export default function Configurations() {
  const [loading, setLoading] = useState<boolean>(false);

  const {toggleConfig} = useUser();

  const {data} = useSession();

  if (!data) return <></>

  return (
    <>
      {loading && (
        <div className="absolute top-0 left-0 w-screen h-screen flex items-center justify-center bg-black bg-opacity-25 z-50">
          <CgSpinnerTwo className="animate-spin text-blue-800" size={30} />
        </div>
      )}
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
                defaultValue={Math.round(data.user.sellTax * 100)}
                width={Width.SPAN_12}
              />
              <div className="absolute bottom-0 right-0 font-bold text-lg h-[40px] flex items-center mr-2.5 text-gray-500 dark:text-slate-800">
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
                // onSubmit={}
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
