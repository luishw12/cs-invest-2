import {Prisma} from "@prisma/client";

export default function handleError(res: any, error: any) {
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    return res.status(400).json({ message: error.message });
  } else {
    return res.status(500).json({ message: "Internal Server Error" });
  }
}