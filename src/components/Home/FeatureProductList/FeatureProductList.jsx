import { Link } from "react-router-dom";
import { ProductCard } from "./ProductCard.jsx";
import { useState, useEffect } from "react";

// ✅ Importando imagens da pasta src/assets
import tenisAdidasImg from '../../../assets/tenis-adidas.jpg';
import camisaNikeImg from '../../../assets/camisa-nike.jpg';
import calcaJeansImg from '../../../assets/calca-jeans.jpg';
import foneJblImg from '../../../assets/fone-jbl.jpg';
import relogioCasioImg from '../../../assets/relogio-casio.jpg';
import jaquetaPumaImg from '../../../assets/jaqueta-puma.jpg';
import mochilaOakleyImg from '../../../assets/mochila-oakley.jpg';
import oculosRaybanImg from '../../../assets/oculos-rayban.jpg';

// ✅ Base local simulada de produtos
const produtosLocais = [
  {
    id: 1,
    nome: "Tênis Adidas",
    tipo: "Tênis",
    preco: 299.99,
    desconto: 0.2,
    imagem: tenisAdidasImg,
    marca: "Adidas",
    sexo: "Unissex"
  },
  {
    id: 2,
    nome: "Camisa Nike",
    tipo: "Camisa",
    preco: 149.99,
    desconto: 0.1,
    imagem: camisaNikeImg,
    marca: "Nike",
    sexo: "Masculino"
  },
  {
    id: 3,
    nome: "Calça Jeans",
    tipo: "Calça",
    preco: 199.99,
    desconto: 0,
    imagem: calcaJeansImg,
    marca: "Levi's",
    sexo: "Feminino"
  },
  {
    id: 4,
    nome: "Fone JBL",
    tipo: "Fone",
    preco: 349.99,
    desconto: 0.15,
    imagem: foneJblImg,
    marca: "JBL",
    sexo: "Unissex"
  },
  {
    id: 5,
    nome: "Relógio Casio",
    tipo: "Relógio",
    preco: 399.99,
    desconto: 0,
    imagem: relogioCasioImg,
    marca: "Casio",
    sexo: "Masculino"
  },
  {
    id: 6,
    nome: "Jaqueta Puma",
    tipo: "Jaqueta",
    preco: 249.99,
    desconto: 0.1,
    imagem: jaquetaPumaImg,
    marca: "Puma",
    sexo: "Feminino"
  },
  {
    id: 7,
    nome: "Mochila Oakley",
    tipo: "Mochila",
    preco: 299.99,
    desconto: 0.05,
    imagem: mochilaOakleyImg,
    marca: "Oakley",
    sexo: "Unissex"
  },
  {
    id: 8,
    nome: "Óculos Ray-Ban",
    tipo: "Óculos",
    preco: 499.99,
    desconto: 0.25,
    imagem: oculosRaybanImg,
    marca: "Ray-Ban",
    sexo: "Unissex"
  }
];

// ✅ Função que simula pegar os produtos
const getProdutosLocal = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(produtosLocais);
    }, 500);
  });
};

// ✅ Componente principal
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

      <div className="grid grid-cols-2 md:grid-cols-3 rounded 2xl:grid-cols-4 bg-gray-50 md:bg-purple-50 gap-3 lg:gap-6 lg:gap-y-10">
        {produtos.slice(0, 8).map((produto) => (
          <ProductCard key={produto.id} produto={produto} />
        ))}
      </div>
    </div>
  );
};
