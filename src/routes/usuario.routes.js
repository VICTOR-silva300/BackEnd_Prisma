const express = require("express");

const route = express.Router();

const {
  listar,
  buscarPorId,
  cadastrar,
  atualizar,
  deletar
} = require("../controller/usuario.controller");

route.get("/listar", listar);
route.get("/:id", buscarPorId);
route.post("/cadastrar", cadastrar);
route.put("/atualizar/:id", atualizar);
route.delete("/deletar/:id", deletar);

module.exports = route;