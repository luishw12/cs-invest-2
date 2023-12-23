import {prisma} from "../../../../lib/prisma";
import handleError from "@/pages/api/_functions/handleError";
import {Models} from "@/pages/api/_functions/_types";

export default async function handleGetById(req: any, res: any, model: Models) {
  const {id} = req.query;

  try {
    // @ts-ignore
    const data = await prisma[model].findUnique({
      where: {id}
    });
    return res.status(200).json(data);
  } catch (e) {
    return handleError(res, e);
  }
}