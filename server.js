require('dotenv').config();
const express = require('express');
const cors = require("cors");

const usuarioRoutes = require("./src/routes/usuario.routes.js");
const pedidoRoutes = require("./src/routes/pedido.routes.js");

const app = express();
app.use(express.json());
app.use(cors());

app.use("/usuarios", usuarioRoutes);
app.use("/pedidos", pedidoRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
