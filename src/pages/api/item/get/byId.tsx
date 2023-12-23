import handleGetById from "@/pages/api/_functions/handleGetById";

export default async function handle(req: any, res: any) {
  if (req.method === "GET") {
    // get date by id
    await handleGetById(req, res, "item");
  } else {
    return res.status(405).json({message: "Method Not allowed"});
  }
}