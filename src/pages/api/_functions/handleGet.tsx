import {prisma} from "../../../../lib/prisma";
import handleError from "@/pages/api/_functions/handleError";
import {Models} from "@/pages/api/_functions/_types";

export default async function handleGet(res: any, model: Models) {
  try {
    // @ts-ignore
    const data = await prisma[model].findMany();
    return res.status(200).json(data);
  } catch (e) {
    return handleError(res, e);
  }
}