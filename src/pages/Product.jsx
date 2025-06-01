import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getProduto } from "../data/produtoService"; // sua função para pegar produto
import { Loader } from "../components/Loader";
import filledStar from "../assets/filled-star.svg";
import star from "../assets/star.svg";
import toast from "react-hot-toast";

// Simulação de "usuário logado"
const usuarioSimulado = { uid: "user123", nome: "Usuário Teste" };

// Simulação de "pedido pendente" e carrinho em memória
let pedidoPendenteSimulado = null;

function obterPedidoPendente(uid) {
  // Retorna o pedido pendente existente (simulado)
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(pedidoPendenteSimulado);
    }, 300);
  });
}

function criarNovoPedido(uid) {
  // Cria novo pedido pendente (simulado)
  return new Promise((resolve) => {
    setTimeout(() => {
      pedidoPendenteSimulado = {
        id: "pedido123",
        usuarioId: uid,
        produtos: [],
        status: "pendente",
      };
      resolve(pedidoPendenteSimulado);
    }, 300);
  });
}

function adicionarAoCarrinho(produto, pedidoId) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (!pedidoPendenteSimulado || pedidoPendenteSimulado.id !== pedidoId) {
        return reject(new Error("Pedido não encontrado"));
      }
      pedidoPendenteSimulado.produtos.push(produto);
      resolve();
    }, 300);
  });
}

export const Product = () => {
  const { id } = useParams();
  const [produto, setProduto] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    getProduto(id)
      .then((resultado) => {
        setProduto(resultado);
      })
      .catch((erro) => {
        console.log(erro);
      });
  }, [id]);

  if (!produto) return <Loader />;

  const preco = parseFloat(produto.preco);
  const desconto = parseFloat(produto.desconto);
  const precoComDesconto = desconto
    ? (preco * (1 - desconto)).toFixed(2)
    : preco.toFixed(2);

  const handleComprar = async () => {
    setLoading(true);

    try {
      // Simulando usuário logado
      const user = usuarioSimulado;

      if (!user) {
        toast.error("Você precisa estar logado para fazer uma compra.");
        navigate("/login");
        return;
      }

      let pedido = await obterPedidoPendente(user.uid);

      if (!pedido) {
        pedido = await criarNovoPedido(user.uid);
      }

      await adicionarAoCarrinho(produto, pedido.id);

      toast.success("Produto adicionado ao carrinho com sucesso!");
      navigate("/checkout");
    } catch (erro) {
      console.error("Erro ao adicionar ao carrinho:", erro);
      toast.error("Erro ao adicionar ao carrinho");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="p-5">
      <p className="leading-[24px] tracking-[0.75px] sm:text-2xl sm:leading-[38px] py-5 font-medium">
        {produto.tipo} {produto.marca} {produto.nome} {produto.sexo}
      </p>
      <div className="flex flex-col lg:flex-row justify-center items-center lg:gap-10">
        <div className="bg-secondary w-full lg:w-1/2 rounded p-12">
          <img
            className="w-full object-contain"
            src={produto.imagem}
            alt={produto.nome}
          />
        </div>
        <div className="w-full lg:w-1/2">
          <h1 className="text-2xl font-bold leading-[32px] tracking-[1px] md:text-[32px] md:leading-[36px] pt-10">
            {produto.tipo} {produto.marca} {produto.nome} {produto.sexo}
          </h1>
          <p className="leading-[24px] tracking-[0.75px] sm:text-2xl sm:leading-[38px] py-5 font-medium">
            {produto.categoria} | {produto.marca} | REF:{produto.id}
          </p>
          <div className="flex">
            {[1, 2, 3, 4, 5].map((valor) => (
              <img
                key={valor}
                src={valor <= (produto.avaliacao || 0) ? filledStar : star}
                alt={`Estrela ${valor}`}
              />
            ))}
            <div className="ml-3 bg-warning text-white rounded font-bold text-xs py-1 px-2 flex justify-center items-center gap-2">
              {produto.avaliacao}{" "}
              <span>
                <img className="h-4" src={star} alt="Estrela" />
              </span>
            </div>
          </div>
          <div className="py-5">
            {desconto && desconto > 0 ? (
              <p>
                R${" "}
                <span className="font-bold text-[32px]">{precoComDesconto}</span>{" "}
                <span className="text-sm line-through opacity-30">
                  {preco.toFixed(2)}
                </span>
              </p>
            ) : (
              <p>
                R${" "}
                <span className="font-bold text-[32px]">{preco.toFixed(2)}</span>
              </p>
            )}
          </div>
          <div>
            <p className="text-sm text-light-gray font-bold leading-[22px] tracking-[.75px]">
              Descrição do produto:
            </p>
            <p className="text-dark-gray-2 text-sm">{produto.descricao}</p>
          </div>
          <button
            onClick={handleComprar}
            disabled={loading}
            className="inline-block bg-warning text-white font-bold tracking-[.75px] uppercase text-center py-3 px-4 rounded-lg w-full h-12 hover:bg-warning_hover mt-12 lg:w-[220px]"
          >
            Comprar
          </button>
        </div>
      </div>
      <button
        onClick={() => navigate(-1)}
        className="inline-block py-5 text-primary font-semibold md:font-normal text-sm md:text-lg tracking-[.75px] hover:font-bold"
      >
        ← Voltar
      </button>
    </section>
  );
};
