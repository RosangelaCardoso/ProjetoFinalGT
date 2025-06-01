/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";

export const ProductCard = ({ produto }) => {
  const preco = parseFloat(produto.preco);
  const desconto = parseFloat(produto.desconto);
  const precoComDesconto = preco * (1 - desconto);

  return (
    <Link to={`/products/${produto.id}`}>
      <section className="font-Inter flex flex-col justify-start items-start p-3 bg-white rounded-2xl shadow-md hover:shadow-lg transition duration-300 h-full">
        
        {/* Selo de desconto */}
        {desconto > 0 ? (
          <div className="bg-bright_yellow px-3 py-1 rounded-full text-xs font-bold mb-2 self-start">
            {desconto * 100}% OFF
          </div>
        ) : (
          <div className="bg-transparent px-3 py-1 rounded-full text-xs font-bold mb-2 text-white select-none">
            Sem desconto
          </div>
        )}

        {/* Imagem do produto */}
        <div className="w-full flex justify-center items-center">
          <img
            className="w-full h-60 object-contain rounded-xl"
            src={produto.imagem}
            alt={produto.nome}
          />
        </div>

        {/* Tipo */}
        <p className="text-light-gray font-bold text-xs mt-3">{produto.tipo}</p>

        {/* Nome */}
        <p className="text-dark-gray-2 font-medium text-base md:text-lg lg:text-xl leading-tight">
          {produto.marca} {produto.nome} - {produto.sexo}
        </p>

        {/* Preço */}
        <div className="flex items-center gap-3 mt-2">
          {desconto > 0 ? (
            <>
              <p className="text-dark-gray text-sm md:text-base lg:text-lg line-through opacity-40">
                R${preco.toFixed(2)}
              </p>
              <p className="text-dark-gray font-bold text-base md:text-lg lg:text-xl">
                R${precoComDesconto.toFixed(2)}
              </p>
            </>
          ) : (
            <p className="text-dark-gray font-bold text-base md:text-lg lg:text-xl">
              R${preco.toFixed(2)}
            </p>
          )}
        </div>
      </section>
    </Link>
  );
};
