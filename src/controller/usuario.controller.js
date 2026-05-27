const prisma = require("../data/prisma");

const listar = async (req, res) => {
  try {
    const usuarios = await prisma.usuario.findMany({
      select: {
        id: true,
        nome: true,
        email: true,
        idade: true
      }
    });

    res.status(200).json(usuarios);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const buscarPorId = async (req, res) => {
  try {
    const { id } = req.params;

    const usuario = await prisma.usuario.findUnique({
      where: {
        id: Number(id)
      },
      select: {
        id: true,
        nome: true,
        email: true,
        idade: true
      }
    });

    if (!usuario) {
      return res.status(404).json({ error: "Usuário não encontrado" });
    }

    res.status(200).json(usuario);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const cadastrar = async (req, res) => {
  try {
    const { nome, senha, email, idade } = req.body;

    if (!nome || !senha || !email || !idade) {
      return res.status(400).json({ error: "Preencha todos os campos" });
    }

    const usuario = await prisma.usuario.create({
      data: {
        nome,
        senha,
        email,
        idade: Number(idade)
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

    const usuarioExiste = await prisma.usuario.findUnique({
      where: { id: Number(id) }
    });

    if (!usuarioExiste) {
      return res.status(404).json({ error: "Usuário não encontrado" });
    }

    const usuario = await prisma.usuario.update({
      where: { id: Number(id) },
      data: req.body
    });

    res.status(200).json(usuario);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deletar = async (req, res) => {
  try {
    const { id } = req.params;

    const usuarioExiste = await prisma.usuario.findUnique({
      where: { id: Number(id) }
    });

    if (!usuarioExiste) {
      return res.status(404).json({ error: "Usuário não encontrado" });
    }

    await prisma.usuario.delete({
      where: { id: Number(id) }
    });

    res.status(200).json({ message: "Usuário deletado com sucesso" });
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