import { useContext, useState } from "react";
import { BurguerIcon } from "../Header/BurguerIcon.jsx";
import { DigitalLogo } from "../Header/DigitalLogo.jsx";
import { CartIcon } from "./CartIcon.jsx";
import { SearchIcon } from "./SearchIcon.jsx";
import { SearchComponent } from "./SearchComponent.jsx";
import { Link, useNavigate } from "react-router-dom";
import { NavBar } from "./NavBar.jsx";
import { Overlay } from "./Overlay.jsx";
import { UserContext } from "../../contexts/UserContext.jsx";
import { Button } from "../Button.jsx";

// MOCK logout (substitui o logout do firebase)
const logout = () => {
  return new Promise((resolve) => {
    console.log("Logout mock executado");
    resolve();
  });
};

// MOCK buscarProdutos (simula uma busca)
const buscarProdutos = (palavraChave) => {
  return new Promise((resolve) => {
    console.log("Buscando produtos mock com palavra-chave:", palavraChave);
    // Retorna array vazio, ou você pode simular resultados
    resolve([]);
  });
};

export const Header = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const user = useContext(UserContext);
  const navigate = useNavigate();

  const toggleSearch = () => setIsSearchOpen(!isSearchOpen);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleOverlayClick = () => setIsMenuOpen(false);

  function handleLogout() {
    logout()
      .then(() => {
        navigate("/login");
      })
      .catch((error) => {
        console.error("Erro ao fazer logout:", error);
      });
  }

  async function busca(event) {
    if (event.key === "Enter") {
      try {
        const palavraChave = event.target.value;
        const resultados = await buscarProdutos(palavraChave);
        console.log("Resultados da busca:", resultados);
        navigate(`/search/${palavraChave}`);
      } catch (error) {
        console.error("Erro ao buscar produtos:", error);
      }
    }
  }

  return (
    <header className="p-5 sm:pt-10 lg:pt-12 sm:pb-[25px] lg:pb-[30px] lg:px-[105px]">
      <section className="flex justify-between items-center pb-5 sm:pb-[42px] gap-10">
        <BurguerIcon onClick={toggleMenu} />
        <DigitalLogo setIsMenuOpen={setIsMenuOpen} />
        <div className="hidden lg:block w-full">
          <SearchComponent onKeyDown={busca} />
        </div>
        {!user && (
          <div className="hidden lg:flex gap-3 items-center justify-center">
            <Link
              className="underline whitespace-nowrap hover:text-primary hover:font-bold"
              to="/register"
            >
              Cadastre-se
            </Link>
            <Link
              to="/login"
              className="bg-primary h-10 w-[114px] text-white rounded-lg block font-bold text-sm text-center p-2.5 hover:bg-tertiary"
            >
              Entrar
            </Link>
          </div>
        )}
        {user && (
          <div className="hidden lg:flex gap-3 items-center justify-center">
            <p className="underline whitespace-nowrap hover:text-primary hover:font-bold">
              Olá, {user.displayName}
            </p>
            <Button title="Logout" onClick={handleLogout} />
          </div>
        )}
        <div className="flex gap-3">
          <SearchIcon hover={true} cursor={true} onClick={toggleSearch} hiddenOnLg={true} />
          <CartIcon />
        </div>
      </section>
      {isSearchOpen && <SearchComponent hiddenOnLg={false} onKeyDown={busca} />}
      <div className="hidden lg:flex">
        <NavBar />
      </div>
      {isMenuOpen && <NavBar setIsMenuOpen={setIsMenuOpen} />}
      {isMenuOpen && (
        <div onClick={handleOverlayClick}>
          <Overlay />
        </div>
      )}
    </header>
  );
};
