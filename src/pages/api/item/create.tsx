import {Prisma} from "@prisma/client";
import {prisma} from "../../../../lib/prisma";
export default async function handle(req: any, res: any) {
  if (req.method === "POST") {
    // create item
    await createItemHandler(req, res);
  } else {
    return res.status(405).json({ message: "Method Not allowed" });
  }
}
async function createItemHandler(req: any, res: any) {
  const { buyPrice, sellPrice, userId, sellTax, ...body } = req.body;

  const currentDate = new Date();

  const dataBody = {
    userId,
    month: currentDate.getMonth() + 1,
    year: currentDate.getFullYear(),
  }

  async function getDateId() {
    return prisma.date.findFirst({
      where: { ...dataBody },
    })
      .then(response => {
        if (!response?.id) {
          return prisma.date.create({
            data: { ...dataBody },
          })
            .then(response => response.id)
        }
        return response.id
      })
  }

  try {
    const buy = Number(buyPrice)
    const sell = Number(sellPrice)
    const profit = sell * (1 - sellTax) - buy

    const data = {
      userId,
      dateId: await getDateId(),
      buyPrice: buy,
      sellPrice: sell,
      percentage: Math.round(profit / buy * 100) / 100,
      realProfit: profit,
      ...body
    }

    const item = await prisma.item.create({
      data
    });

    return res.status(201).json({ item });
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      return res.status(400).json({ message: e.message });
    }
    return res.status(400).json({ message: e });
  }
}