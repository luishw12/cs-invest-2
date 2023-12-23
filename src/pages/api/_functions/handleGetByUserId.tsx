import {prisma} from "../../../../lib/prisma";
import handleError from "@/pages/api/_functions/handleError";
import {Models} from "@/pages/api/_functions/_types";

export default async function handleGetByUserId(req: any, res: any, model: Models) {
  const {userId} = req.query;

  try {
    // @ts-ignore
    const data = await prisma[model].findMany({
      where: {userId}
    });
    return res.status(200).json(data);
  } catch (e) {
    return handleError(res, e);
  }
}