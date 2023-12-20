import { SHA256 as sha256 } from "crypto-js";
import { Prisma } from "@prisma/client";
import {prisma} from "../../../../lib/prisma";
export default async function handle(req: any, res: any) {
  if (req.method === "POST") {
    // create user
    await createUserHandler(req, res);
  } else {
    return res.status(405).json({ message: "Method Not allowed" });
  }
}
// We hash the user entered password using crypto.js
export const hashPassword = (password:string) => {
  return sha256(password).toString();
};
async function createUserHandler(req: any, res: any) {
  const { plan, ...body } = req.body;

  try {
    const planInfo = await prisma.plan.findFirst({
      where: { id: plan }
    })

    const dateExpire = new Date()
    dateExpire.setMonth(dateExpire.getMonth() + (planInfo?.duration || 0));

    const user = await prisma.user.create({
      data: {
        ...body,
        password: hashPassword(req.body.password),
        dateExpire
      },
    });

    await prisma.purchaseInfo.create({
      data: {
        userId: user.id,
        planId: plan
      }
    })

    return res.status(201).json({ user });
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