import {Role} from "@/types/enum/role";

export const userService = {
  authenticate,
};

function authenticate(email: string, password: string) {
  if(email !== "admin" && password !== "admin") { //(1)
    return null; //(2)
  }

  return {
    id: "9001",
    name: "Web Admin",
    email: "admin@example.com",
    phone: null,
    sellTax: 0.1,
    role: Role.ADMIN
  }; // (3)
}