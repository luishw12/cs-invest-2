'use client'
import {useEffect} from "react";
import classNames from "@/components/classNames";
import {signIn, useSession} from "next-auth/react";
import {useRouter} from "next/navigation";
import {toast} from "react-toastify";
import {Button, Form, Input} from "design-system-toshyro";
import Link from "next/link";

export default function Login() {
  const {data} = useSession();

  const router = useRouter();

  useEffect(() => {
    if (data?.user) router.push("/dashboard");
  }, [router, data?.user])

  async function onSubmit({email, password}: any) {
    let res = await signIn("credentials", {
      email,
      password,
      callbackUrl: `/`,
      redirect: false,
    });

    const teste = await fetch(
      `${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/api/user/auth`,
      {
        method: "POST",
        body: JSON.stringify({
          email,
          password,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    console.log(res)

    if (res?.ok) {
      toast.success("Login efetuado.");
      return;
    }
    toast.error("Falha! Verifique os campos e tente novamente.");

    return res;
  }

  return (
    <div className={classNames(
      "flex h-screen flex-1 flex-col justify-center px-6 py-12 lg:px-8",
      "dark:bg-gradient-to-bl from-slate-800 to-slate-900"
    )}>
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className={classNames(
          "mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900",
          "dark:text-white"
        )}>
          Acesse sua conta
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm flex flex-col gap-10">
        <Form className="space-y-6 dark:bg-opacity-0">
          <>
            <Input label={"Email"}
                   name={"email"}
                   type={"email"}
                   className={"text-slate-200 border-slate-700"}
                   validation={{required: "Este campo é obrigatório."}}/>

            <div className={"relative"}>
              <Input label={"Senha"}
                     name={"password"}
                     type={"password"}
                     className={"text-slate-200 border-slate-700"}
                     validation={{required: "Este campo é obrigatório."}}/>

              <div className="text-sm absolute top-0 right-0">
                <Link href={"recover"} className={classNames(
                  "font-semibold text-blue-600 hover:text-blue-500",
                  "dark:text-blue-400 dark:hover:text-blue-500"
                )}>
                  Esqueceu a senha?
                </Link>
              </div>
            </div>

            <Button type="button"
                    onSubmit={onSubmit}
                    className={"border-0"}
                    full>
              Entrar
            </Button>
          </>
        </Form>
      </div>
    </div>
  )
}