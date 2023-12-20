"use client";
import {Button, Form, Input, Variant} from "design-system-toshyro";
import {useUser} from "@/context/UserContext";
import {useSession} from "next-auth/react";

export default function ModalUpdate() {
  const { toggleView, toggleEdit, editItem } = useUser();
  const {data} = useSession();

  if (!data) return;

  return (
    <div className="absolute h-screen w-screen top-0 left-0 bg-black bg-opacity-30 flex items-center justify-center">
      <Form className="p-8 bg-white rounded-xl grid grid-cols-12 gap-5 dark:bg-slate-800 dark:text-slate-300">
        <h2 className="text-xl font-semibold text-center col-span-12">
          Editar Item
        </h2>

        <Input
          name={"name"}
          label="Nome do item"
          defaultValue={editItem.name}
          width="col-span-12"
        />
        <Input
          name={"marketUrl"}
          label="Link da skin"
          defaultValue={editItem.marketUrl}
          width="col-span-12"
        />
        <Input
          name={"buyPrice"}
          label="Valor da compra"
          type="number"
          defaultValue={editItem.buyPrice}
          validation={{ required: "Este campo é obrigatório" }}
          width="col-span-6"
        />
        <Input
          name={"sellPrice"}
          label="Valor da Venda"
          type="number"
          defaultValue={editItem.sellPrice}
          validation={{ required: "Este campo é obrigatório" }}
          width="col-span-6"
        />
        <Input name="highlights" hidden defaultValue={editItem.highlights} />
        <Input name="sold" hidden defaultValue={editItem.sold} />
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
              // handleRegister(e, editItem.id);
              toggleEdit();
              toggleView();
            }}
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
