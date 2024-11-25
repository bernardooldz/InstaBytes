import express from "express"; // Importa o módulo Express para criar o servidor web.
import routes from "./src/routes/postsRoutes.js";

const app = express(); // Cria uma instância do servidor Express.
app.use(express.static("uploads"))
routes(app)

app.listen(3000, () => {
    console.log("Servidor escutando..."); // Inicia o servidor na porta 3000 e imprime uma mensagem no console.
});
