import handleGet from "@/pages/api/_functions/handleGet";

export default async function handle(req: any, res: any) {
  if (req.method === "GET") {
    // get users
    await handleGet(res, "user")
  } else {
    return res.status(405).json({ message: "Method Not allowed" });
  }
}