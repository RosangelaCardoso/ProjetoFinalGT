import { useForm } from "react-hook-form";
import { Button } from "../components/Button";
import google from "../assets/google.png";
import facebook from "../assets/facebook.png";
import tenisLeft from "../assets/tenis-left.png";
import tenisRight from "../assets/tenis-right.png";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  // Simula uma "base de usuários" local
  const usuariosSimulados = [
    { email: "usuario@teste.com", password: "12345678" },
    { email: "admin@teste.com", password: "abcdefgh" },
  ];

  function entrar(data) {
    const usuarioEncontrado = usuariosSimulados.find(
      (user) => user.email === data.email && user.password === data.password
    );
    if (usuarioEncontrado) {
      toast.success("Usuário logado com sucesso!");
      navigate("/");
    } else {
      toast.error("E-mail ou senha inválidos.");
    }
  }

  function handleEntrarGoogle() {
    toast("Login com Google não implementado (simulação).");
  }

  function handleEntrarFacebook() {
    toast("Login com Facebook não implementado (simulação).");
  }

  return (
    <section className="bg-secondary px-[30px] pt-16 pb-[82px] flex flex-col items-center lg:flex-row lg:justify-evenly">
      <section className="bg-white p-[30px] rounded w-full sm:w-[583px]">
        <h1 className="font-bold text-[22px] sm:text-[32px] text-center leading-[34px] sm:leading-[36px] tracking-[2px] sm:tracking-[1px] sm:text-left pb-2.5 sm:pb-5">
          Acesse sua conta
        </h1>
        <p className="text-center sm:text-left text-sm sm:text-base pb-[30px]">
          Novo cliente? Então registre-se{" "}
          <Link className="underline" to="/register">
            aqui
          </Link>
        </p>
        <form onSubmit={handleSubmit(entrar)}>
          <div className="flex flex-col">
            <label className="mt-3 font-bold" htmlFor="email">
              E-mail *
            </label>
            <input
              className="w-full p-4 bg-light-gray-3 rounded-lg"
              type="email"
              id="email"
              placeholder="Insira seu e-mail"
              {...register("email", {
                required: "E-mail obrigatório",
                pattern: {
                  value: /[\w.-]+@[\w-]+\.[\w-.]+/gi,
                  message: "E-mail inválido",
                },
              })}
            />
            {errors.email && (
              <small className="text-red-500">{errors.email.message}</small>
            )}
          </div>
          <div className="flex flex-col">
            <label htmlFor="password" className="mt-3 font-bold">
              Senha *
            </label>
            <input
              className="w-full p-4 bg-light-gray-3 rounded-lg"
              type="password"
              id="password"
              placeholder="Insira uma senha"
              {...register("password", {
                required: "Digite uma senha",
                minLength: {
                  value: 8,
                  message: "A senha deve ter pelo menos 8 dígitos",
                },
              })}
            />
            {errors.password && (
              <small className="text-red-500">{errors.password.message}</small>
            )}
          </div>
          <div className="mt-[30px]">
            <Link
              className="underline font-semibold text-sm"
              to="/reset-password"
            >
              Esqueci minha senha
            </Link>
          </div>
          <div className="mt-[30px]">
            <Button type="submit" title="Entrar" />
          </div>
          <div className="flex flex-col items-center justify-center lg:flex-row pt-[30px] gap-5">
            <p className="text-center text-sm sm:text-base">
              Ou faça login com
            </p>
            <div className="flex justify-center gap-6">
              <button type="button" onClick={handleEntrarGoogle}>
                <img src={google} alt="Ícone do G-Mail" />
              </button>
              <button type="button" onClick={handleEntrarFacebook}>
                <img src={facebook} alt="Ícone do Facebook" />
              </button>
            </div>
          </div>
        </form>
      </section>
      <div className="lg:flex w-[500px] h-[600px] justify-between hidden relative">
        <img
          className="absolute top-0 left-0 w-[300px]"
          src={tenisLeft}
          alt="Imagem de tênis"
        />
        <img
          className="absolute bottom-0 right-0 w-[300px]"
          src={tenisRight}
          alt="Imagem de tênis"
        />
      </div>
    </section>
  );
};
