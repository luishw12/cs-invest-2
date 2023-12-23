import axios from "axios";

const axiosPrisma = axios.create({
  baseURL: "/api",
})

axiosPrisma.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("Erro na requisição:", error);
    return Promise.reject(error);
  }
);

export {axiosPrisma}