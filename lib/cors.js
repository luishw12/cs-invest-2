// lib/cors.js
import Cors from 'cors';

// Inicializa o middleware CORS
const cors = Cors({
  methods: ['GET', 'HEAD', 'POST', 'PUT', 'DELETE'],
  origin: '*', // Permite qualquer origem
});

// Helper para aguardar a execução do middleware antes de continuar
function runMiddleware(req, res, fn) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve(result);
    });
  });
}

export default runMiddleware;
export { cors };
