import {Models} from "@/pages/api/_functions/_types";
import {prisma} from "../../../../../lib/prisma";
import handleError from "@/pages/api/_functions/handleError";

export default async function handle(req: any, res: any) {
  if (req.method === "GET") {
    // get date by year and month
    await handleGetByYearAndMonth(req, res, "date");
  } else {
    return res.status(405).json({message: "Method Not allowed"});
  }
}

async function handleGetByYearAndMonth(req: any, res: any, model: Models) {
  const {year} = req.query;

  try {
    // @ts-ignore
    const data = await prisma[model].findMany({
      where: {
        year: Number(year)
      }
    });
    return res.status(200).json(data);
  } catch (e) {
    return handleError(res, e);
  }
}