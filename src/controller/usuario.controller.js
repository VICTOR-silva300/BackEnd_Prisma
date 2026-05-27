const prisma = require("../data/prisma");


const listar = async (req, res) => {
  try {
    const usuarios = await prisma.usuario.findMany();

    res.status(200).json(usuarios);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const buscarPorId = async (req, res) => {
  const { id } = req.params;

  const usuario = await prisma.usuario.findUnique({
    where: {
      id: Number(id)
    }
  });

  res.status(200).json(usuario);
};

const cadastrar = async (req, res) => {
  try {
    const { nome, senha, email, idade } = req.body;

    const usuario = await prisma.usuario.create({
      data: {
        nome,
        senha,
        email,
        idade
      }
    });

    res.status(201).json(usuario);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


const atualizar = async (req, res) => {
  try {
    const { id } = req.params;

    const { nome, senha, email, idade } = req.body;

    const usuario = await prisma.usuario.update({
      where: {
        id: Number(id)
      },
      data: {
        nome,
        senha,
        email,
        idade
      }
    });

    res.status(200).json(usuario);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


const deletar = async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.usuario.delete({
      where: {
        id: Number(id)
      }
    });

    res.status(200).json({
      message: "Usuário deletado"
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  listar,
  buscarPorId,
  cadastrar,
  atualizar,
  deletar
};