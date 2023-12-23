import {Prisma} from "@prisma/client";
import {prisma} from "../../../../../lib/prisma";
import handleGetById from "@/pages/api/_functions/handleGetById";

export default async function handle(req: any, res: any) {
  if (req.method === "GET") {
    // get date by id
    await handleGetById(req, res, "date");
  } else {
    return res.status(405).json({message: "Method Not allowed"});
  }
}