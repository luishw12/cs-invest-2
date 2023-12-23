import {Prisma} from "@prisma/client";
import {prisma} from "../../../../lib/prisma";
export default async function handle(req: any, res: any) {
  if (req.method === "POST") {
    // create aporte
    await createAporteHandler(req, res);
  } else {
    return res.status(405).json({ message: "Method Not allowed" });
  }
}
async function createAporteHandler(req: any, res: any) {
  const { userId, month, year, value } = req.body;

  const dataBody = {
    userId,
    month,
    year,
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
    const data = {
      dateId: await getDateId(),
      userId,
      value,
    }

    const aporte = await prisma.aporte.create({
      data
    })

    return res.status(201).json({ aporte });
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      return res.status(400).json({ message: e.message });
    }
    return res.status(400).json({ message: e });
  }
}