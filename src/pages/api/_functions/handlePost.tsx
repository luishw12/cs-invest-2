import {prisma} from "../../../../lib/prisma";
import handleError from "@/pages/api/_functions/handleError";
import {Models} from "@/pages/api/_functions/_types";

export default async function handlePost(req: any, res: any, model: Models) {
  try {
    // @ts-ignore
    const data = await prisma[model].create({ data: req.body });
    return res.status(201).json(data);
  } catch (e) {
    return handleError(res, e);
  }
}