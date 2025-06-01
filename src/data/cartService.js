let pedidoPendente = {
  id: "pedido123",
  produtos: [
    {
      id: "1",
      nome: "Camisa Polo Branca",
      preco: 99.99,
      quantidade: 2,
      desconto: 0.1,
      imagem: "/images/camisa-polo-branca.jpg",
    },
    {
      id: "2",
      nome: "Camisa Social Azul",
      preco: 129.99,
      quantidade: 1,
      desconto: 0,
      imagem: "/images/camisa-social-azul.jpg",
    },
  ],
  status: "Pendente",
};

export const obterPedidoPendente = async (userId) => {
  return pedidoPendente;
};

export const obterProdutosDoCarrinho = async (pedidoId) => {
  return pedidoPendente.produtos;
};

export const atualizarProdutoNoCarrinho = async (pedidoId, produtoId, quantidade) => {
  pedidoPendente.produtos = pedidoPendente.produtos.map((produto) =>
    produto.id === produtoId ? { ...produto, quantidade } : produto
  );
};

export const removerProdutoDoCarrinho = async (pedidoId, produtoId) => {
  pedidoPendente.produtos = pedidoPendente.produtos.filter(
    (produto) => produto.id !== produtoId
  );
};

export const atualizarStatusDoPedido = async (pedidoId, novoStatus) => {
  pedidoPendente.status = novoStatus;
};
