"use client";
import {Button, Form, Input, Variant, Width} from "design-system-toshyro";
import {useUser} from "@/context/UserContext";
import {useSession} from "next-auth/react";
import {toast} from "react-toastify";
import {axiosPrisma} from "../../../../axios";

export default function ModalUpdate() {
  const {toggleView, toggleEdit, getInfos, currentItem} = useUser();
  const {data} = useSession();

  if (!data) return;

  function handleSubmit(e:any) {
    axiosPrisma.put("/item/edit", {
        id: currentItem!.id,
        sellTax: data!.user.sellTax,
        ...e
    })
      .then(() => {
        toast.success("Item editado com sucesso.")
      })
      .finally(() => getInfos())
  }

  return (
    <div className="absolute h-screen w-screen top-0 left-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <Form className="p-8 bg-white rounded-xl grid grid-cols-12 gap-5 dark:bg-slate-800 dark:text-slate-300">
        <h2 className="text-xl font-semibold text-center col-span-12">
          Editar Item
        </h2>

        <Input name={"name"}
               label="Nome do item"
               defaultValue={currentItem?.name}
               width={Width.SPAN_12}
        />
        <Input name={"buyPrice"}
               label="Valor da compra"
               type="number"
               defaultValue={currentItem?.buyPrice}
               validation={{required: "Este campo é obrigatório"}}
               width={Width.SPAN_6}
        />
        <Input name={"sellPrice"}
               label="Valor da Venda"
               type="number"
               defaultValue={currentItem?.sellPrice || ""}
               validation={{required: "Este campo é obrigatório"}}
               width={Width.SPAN_6}
        />
        <div className="col-span-12 grid grid-cols-2 gap-5 mt-5">
          <Button
            onClick={() => {
              toggleEdit()
              toggleView();
            }}
            variant={Variant.CANCEL}
            type="button"
            full
          >
            Cancelar
          </Button>
          <Button
            onSubmit={(e) => {
              handleSubmit(e)
              toggleEdit();
              toggleView();
            }}
            type="button"
            full
          >
            Salvar
          </Button>
        </div>
      </Form>
    </div>
  );
}
