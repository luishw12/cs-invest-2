import {Models} from "@/pages/api/_functions/_types";
import {prisma} from "../../../../../lib/prisma";
import handleError from "@/pages/api/_functions/handleError";

export default async function handle(req: any, res: any) {
  if (req.method === "GET") {
    // get date by year and month
    await handleGetByDate(req, res, "date");
  } else {
    return res.status(405).json({message: "Method Not allowed"});
  }
}

async function handleGetByDate(req: any, res: any, model: Models) {
  const {userId, year, month} = req.query;

  try {
    const where: any = { userId, year: Number(year) }

    if (month) where.month = Number(month)
    // @ts-ignore
    const data = await prisma[model].findMany({
      where
    });
    return res.status(200).json(data);
  } catch (e) {
    return handleError(res, e);
  }
}