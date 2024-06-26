import {prisma} from "../../../../lib/prisma";
import {hashPassword} from "@/pages/api/user/create";
import Cors from "cors";

// Initialize the cors middleware
const cors = Cors({
  methods: ["POST", "GET", "HEAD"],
  origin: "http://your-frontend-domain.com", // Substitua pelo seu domínio de frontend
});

// Helper method to wait for a middleware to execute before continuing
function runMiddleware(req: any, res: any, fn: any) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result: any) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve(result);
    });
  });
}

export default async function handle(req: any, res: any) {
  await runMiddleware(req, res, cors);
  
  if (req.method === "POST") {
    //login user
    await loginUserHandler(req, res);
  } else {
    return res.status(405);
  }
}
async function loginUserHandler(req: any, res: any) {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "invalid inputs" });
  }
  try {
    const user = await prisma.user.findUnique({
      where: { email: email }
    });
    if (user && user.password === hashPassword(password)) {
      // exclude password from json response
      return res.status(200).json(exclude(user, ["password"]));
    } else {
      return res.status(401).json({ message: "invalid credentials" });
    }
  } catch (e:any) {
    throw new Error(e);
  }
}
// Function to exclude user password returned from prisma
function exclude(user: any, keys: any) {
  for (let key of keys) {
    delete user[key];
  }
  return user;
}