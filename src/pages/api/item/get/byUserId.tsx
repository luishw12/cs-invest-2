import handleGetByUserId from "@/pages/api/_functions/handleGetByUserId";

export default async function handle(req: any, res: any) {
  if (req.method === "GET") {
    // get items by userId
    await handleGetByUserId(req, res, "item");
  } else {
    return res.status(405).json({message: "Method Not allowed"});
  }
}
