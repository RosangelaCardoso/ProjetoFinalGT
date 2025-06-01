import { produtos } from "./produtos.js";

export function getProduto(id) {
  return produtos.find(produto => produto.id === id);
}

export function getProdutos() {
  return produtos;
}

export function getProdutosTipo(tipo) {
  return produtos.filter(produto => produto.tipo === tipo);
}
