import handleGetByDateId from "@/pages/api/_functions/handleGetByDateId";

export default async function handle(req: any, res: any) {
  if (req.method === "GET") {
    // get dates by userId
    await handleGetByDateId(req, res, "aporte");
  } else {
    return res.status(405).json({message: "Method Not allowed"});
  }
}
