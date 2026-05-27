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
  const { id } = req.params;

  const pedido = await prisma.pedido.findUnique({
    where: {
      id: Number(id)
    }
  });

  res.status(200).json(pedido);
};

const cadastrarPedido = async (req, res) => {
  try {
    const { produto, usuarioId } = req.body;

    const pedido = await prisma.pedido.create({
      data: {
        produto,
        usuarioId
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

    const { produto } = req.body;

    const pedido = await prisma.pedido.update({
      where: {
        id: Number(id)
      },
      data: {
        produto
      }
    });

    res.status(200).json(pedido);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deletarPedido = async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.pedido.delete({
      where: {
        id: Number(id)
      }
    });

    res.status(200).json({
      message: "Pedido deletado"
    });
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