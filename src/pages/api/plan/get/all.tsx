import { Prisma } from "@prisma/client";
import {prisma} from "../../../../../lib/prisma";
import handleGet from "@/pages/api/_functions/handleGet";
export default async function handle(req: any, res: any) {
  if (req.method === "GET") {
    // get plans
    await handleGet(res, "plan");
  } else {
    return res.status(405).json({ message: "Method Not allowed" });
  }
}