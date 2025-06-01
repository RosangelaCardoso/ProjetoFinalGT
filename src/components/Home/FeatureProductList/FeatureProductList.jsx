import { Link } from "react-router-dom";
import { ProductCard } from "./ProductCard.jsx";
import { useState, useEffect } from "react";

// Imagens
import tenisAdidasImg from "../../../assets/tenis-adidas.jpeg";
import camisaNikeImg from "../../../assets/camisa-nike.jpg.webp";
import calcaJeansImg from "../../../assets/calca-jeans.jpeg";
import foneJblImg from "../../../assets/fone-jbl.jpeg";
import jaquetaPumaImg from "../../../assets/jaqueta-puma.jpeg";
import mochilaOakleyImg from "../../../assets/mochila-oakley.jpeg";
import oculosRaybanImg from "../../../assets/oculos-rayban.webp";
import relogioCasioImg from "../../../assets/Relógio Casio.jpeg"; // ou .jpg/.webp conforme o nome


// Produtos com imagens e preços
const produtosLocais = [
  { id: 1, nome: "Tênis Adidas", tipo: "Tênis", preco: 299.99, imagem: tenisAdidasImg },
  { id: 2, nome: "Camisa Nike", tipo: "Camisa", preco: 149.90, imagem: camisaNikeImg },
  { id: 3, nome: "Calça Jeans", tipo: "Calça", preco: 199.90, imagem: calcaJeansImg },
  { id: 4, nome: "Fone JBL", tipo: "Fone", preco: 399.00, imagem: foneJblImg },
{ id: 5, nome: "Relógio Casio", tipo: "Relógio", preco: 250.00, imagem: relogioCasioImg },
  { id: 6, nome: "Jaqueta Puma", tipo: "Jaqueta", preco: 329.90, imagem: jaquetaPumaImg },
  { id: 7, nome: "Mochila Oakley", tipo: "Mochila", preco: 189.90, imagem: mochilaOakleyImg },
  { id: 8, nome: "Óculos Ray-Ban", tipo: "Óculos", preco: 549.00, imagem: oculosRaybanImg },
];

const getProdutosLocal = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(produtosLocais);
    }, 500);
  });
};

export const FeaturedProductList = () => {
  const [produtos, setProdutos] = useState([]);

  useEffect(() => {
    getProdutosLocal().then(setProdutos);
  }, []);

  return (
    <div className="text-Inter px-5 md:px-[100px] bg-gray-50 md:bg-purple-50 md:pb-[80px] pb-10">
      <div className="flex justify-between mb-5 items-center">
        <h1 className="font-bold md:text-2xl">Produtos em alta</h1>
        <Link
          to={"/products"}
          className="text-primary font-semibold md:font-normal text-sm md:text-lg tracking-[.75px] hover:font-bold"
        >
          Ver todos →
        </Link>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 2xl:grid-cols-4 gap-3 lg:gap-6 lg:gap-y-10">
        {produtos.slice(0, 8).map((produto) => (
          <ProductCard key={produto.id} produto={produto} />
        ))}
      </div>
    </div>
  );
};
