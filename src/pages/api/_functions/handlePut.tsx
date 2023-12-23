import {prisma} from "../../../../lib/prisma";
import handleError from "@/pages/api/_functions/handleError";
import {Models} from "@/pages/api/_functions/_types";

export default async function handlePut(req: any, res: any, model: Models) {
  try {
    const { id, ...rest } = req.body;
    // @ts-ignore
    const data = await prisma[model].update({ where: { id }, data: rest });
    return res.status(200).json(data);
  } catch (e) {
    return handleError(res, e);
  }
}