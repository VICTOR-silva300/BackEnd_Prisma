const prisma = require("../data/prisma");

const listarPedidos = async (req, res) => {
  try {
    const pedidos = await prisma.pedido.findMany();

    res.status(200).json(pedidos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const buscarPedidoPorId = async (req, res) => {
  try {
    const { id } = req.params;

    const pedido = await prisma.pedido.findUnique({
      where: {
        id: Number(id)
      }
    });

    if (!pedido) {
      return res.status(404).json({ error: "Pedido não encontrado" });
    }

    res.status(200).json(pedido);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const cadastrarPedido = async (req, res) => {
  try {
    const { produto, usuarioId } = req.body;

    if (!produto || !usuarioId) {
      return res.status(400).json({ error: "Preencha todos os campos" });
    }

    const usuarioExiste = await prisma.usuario.findUnique({
      where: { id: Number(usuarioId) }
    });

    if (!usuarioExiste) {
      return res.status(404).json({ error: "Usuário não encontrado" });
    }

    const pedido = await prisma.pedido.create({
      data: {
        produto,
        usuarioId: Number(usuarioId)
      }
    });

    res.status(201).json(pedido);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const atualizarPedido = async (req, res) => {
  try {
    const { id } = req.params;

    const pedidoExiste = await prisma.pedido.findUnique({
      where: { id: Number(id) }
    });

    if (!pedidoExiste) {
      return res.status(404).json({ error: "Pedido não encontrado" });
    }

    const pedido = await prisma.pedido.update({
      where: { id: Number(id) },
      data: req.body
    });

    res.status(200).json(pedido);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deletarPedido = async (req, res) => {
  try {
    const { id } = req.params;

    const pedidoExiste = await prisma.pedido.findUnique({
      where: { id: Number(id) }
    });

    if (!pedidoExiste) {
      return res.status(404).json({ error: "Pedido não encontrado" });
    }

    await prisma.pedido.delete({
      where: { id: Number(id) }
    });

    res.status(200).json({ message: "Pedido deletado com sucesso" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  listarPedidos,
  buscarPedidoPorId,
  cadastrarPedido,
  atualizarPedido,
  deletarPedido
};