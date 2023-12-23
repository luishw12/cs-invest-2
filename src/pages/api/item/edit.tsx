import { Prisma } from "@prisma/client";
import {prisma} from "../../../../lib/prisma";

export default async function handle(req: any, res: any) {
  if (req.method === "PUT") {
    // edit item
    await editItemHandler(req, res);
  } else {
    return res.status(405).json({ message: "Method Not allowed" });
  }
}
async function editItemHandler(req: any, res: any) {
  const { id, buyPrice, sellPrice, name, sellTax } = req.body;

  try {
    const buy = Number(buyPrice)
    const sell = Number(sellPrice)
    const profit = sell * (1 - sellTax) - buy

    const item = await prisma.item.update({
      where: {
        id
      },
      data: {
        buyPrice: buy,
        sellPrice: sell,
        percentage: Math.round(profit / buy * 100) / 100,
        realProfit: profit,
        name
      },
    });

    return res.status(201).json({ item });
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      if (e.code === "P2002") {
        return res.status(400).json({ message: e.message });
      }
      return res.status(400).json({ message: e.message });
    }
  }
}