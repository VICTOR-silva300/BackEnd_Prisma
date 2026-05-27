const express = require("express");

const route = express.Router();

const {
  listarPedidos,
  buscarPedidoPorId,
  cadastrarPedido,
  atualizarPedido,
  deletarPedido
} = require("../controller/pedido.controller");

route.get("/listar", listarPedidos);
route.get("/:id", buscarPedidoPorId);
route.post("/cadastrar", cadastrarPedido);
route.put("/atualizar/:id", atualizarPedido);
route.delete("/deletar/:id", deletarPedido);

module.exports = route;