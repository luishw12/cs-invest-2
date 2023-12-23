import {Prisma} from "@prisma/client";
import {prisma} from "../../../../lib/prisma";

export default async function handle(req: any, res: any) {
  if (req.method === "POST") {
    // create plan
    await createPlanHandler(req, res);
  } else {
    return res.status(405).json({ message: "Method Not allowed" });
  }
}
async function createPlanHandler(req: any, res: any) {
  const { duration, price } = req.body;

  try {
    const plan = await prisma.plan.create({
      data: {
        duration: Number(duration),
        price: Number(price),
      },
    });

    return res.status(201).json({ plan });
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      if (e.code === "P2002") {
        return res.status(400).json({ message: e.message });
      }
      return res.status(400).json({ message: e.message });
    }

    return res.status(400).json({ message: e });
  }
}