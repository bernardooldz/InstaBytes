import express from "express"; // Importa o módulo Express para criar a aplicação web.
import multer from "multer"; // Importa o módulo Multer para lidar com o upload de arquivos.
import { listarPosts, postarNovoPost, uploadImagem, atualizarNovoPost } from "../controllers/postsController.js"; // Importa funções para manipular requisições de posts de um outro arquivo.
import cors from "cors";

const corsOptions = {
  origin:"http://localhost:8000",
  OptionsSuccessStatus: 200
}

// Configura o armazenamento para arquivos enviados
const storage = multer.diskStorage({
  destination: function (req, file, cb) { // Define o destino onde os arquivos serão salvos.
    cb(null, 'uploads/'); // Define a pasta "uploads/" como destino.
  },
  filename: function (req, file, cb) { // Define o nome do arquivo salvo.
    cb(null, file.originalname); // Usa o nome original do arquivo enviado.
  }
});

// Cria uma instância do Multer com a configuração de armazenamento
const upload = multer({ dest: "./uploads", storage }); // Configura o Multer para salvar arquivos na pasta "uploads".

// Rotas da aplicação
const routes = (app) => {
  app.use(express.json()); // Habilita o middleware para analisar dados JSON nas requisições.
  app.use(cors(corsOptions))

  // Define as rotas e suas respectivas funções controladoras
  app.get("/posts", listarPosts); // Rota para listar todos os posts.
  app.post("/posts", postarNovoPost); // Rota para criar um novo post.
  app.post("/upload", upload.single("imagem"), uploadImagem); // Rota para fazer upload de uma imagem.
  app.put("/upload/:id", atualizarNovoPost)
};

export default routes; // Exporta a função de rotas para ser usada em outros módulos.