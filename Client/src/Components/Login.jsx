import { useState, useEffect, useContext } from "react";
import { Link, Navigate } from "react-router-dom"; // Componentes de roteamento do React Router
import Logo from "../assets/Logo.png"; // Importação do logo da aplicação
import CompradorRepository from "../services/CompradorRepository"; // Importação do serviço de repositório de compradores
import AppContext from "../context/AppContext"; // Contexto da aplicação
import Utils from "../utils/Funcoes"; // Funções utilitárias

const Login = () => {
  const [email, setEmail] = useState(""); // Estado para armazenar o e-mail do usuário
  const [password, setPassword] = useState(""); // Estado para armazenar a senha do usuário
  const [redirect, setRedirect] = useState(false); // Estado para controlar o redirecionamento após o login
  const [compradores, setCompradores] = useState([]); // Estado para armazenar a lista de compradores
  const [loginError, setLoginError] = useState(false); // Estado para indicar erro de login
  const { setLogged, setFullName } = useContext(AppContext); // Contexto da aplicação para controlar se o usuário está logado

  const handleSubmit = (event) => {
    event.preventDefault(); // Evita o comportamento padrão de envio do formulário

    // Verifica se existe um comprador com o e-mail e senha fornecidos
    const comprador = compradores.find(
      (comprador) => comprador.email === email && comprador.senha === password
    );

    if (comprador) {
      // Se encontrar o comprador
      setLogged(true); // Define o usuário como logado no contexto da aplicação
      setFullName(comprador.nome);
      setRedirect(true); // Ativa o redirecionamento para a página inicial
      Utils.setCookie("login", JSON.stringify(comprador)); // Define um cookie com os dados do comprador
      const getCookie = Utils.getCookie("login"); // Verifica se o cookie foi criado com sucesso
      console.log(getCookie); // Imprime o resultado do cookie criado
    } else {
      // Se não encontrar o comprador
      setLoginError(true); // Ativa o estado de erro de login
    }

    console.log("Dados de Login:", { email, password }); // Imprime os dados de login no console
  };

  useEffect(() => {
    async function fetchData() {
      // Função assíncrona para buscar os compradores do banco de dados
      try {
        const compradoresBD = await CompradorRepository.getAllCompradores(); // Obtém todos os compradores
        setCompradores(compradoresBD); // Atualiza o estado dos compradores com os dados obtidos
      } catch (error) {
        console.error("Error fetching data:", error); // Trata erros de busca de dados
      }
    }

    fetchData(); // Chama a função para buscar os compradores ao montar o componente
  }, []); // Array vazio garante que o useEffect execute apenas uma vez, após a montagem inicial do componente

  if (redirect) {
    // Se o redirecionamento estiver ativo
    return <Navigate to="/" replace={true} />; // Redireciona o usuário para a página inicial
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col items-center mb-6">
            <Link to={"/"}>
              <img src={Logo} alt="Logo" className="w-40 h-auto mb-6" />
            </Link>
            <h1 className="text-2xl font-bold mb-4">Login</h1>
          </div>

          <div className="mb-3">
            <div className="flex items-center border border-gray-300 rounded-md p-2 hover:bg-gray-50 focus-within:ring-2 focus-within:ring-teal-500">
              <svg
                className="w-6 h-6 text-gray-500 mr-2"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 12V4a4 4 0 10-8 0v8a4 4 0 004 4v5a2 2 0 104 0v-5a4 4 0 004-4z"
                />
              </svg>
              <input
                type="text"
                placeholder="E-mail"
                required
                className="w-full border-none outline-none focus:ring-0"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div className="mb-3">
            <div className="flex items-center border border-gray-300 rounded-md p-2 hover:bg-gray-50 focus-within:ring-2 focus-within:ring-teal-500">
              <svg
                className="w-6 h-6 text-gray-500 mr-2"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5.121 6.343a3.5 3.5 0 014.95-1.414A6.5 6.5 0 0112 4c1.357 0 2.637.402 3.732 1.073A3.5 3.5 0 1118.12 6.34"
                />
              </svg>
              <input
                type="password"
                placeholder="Senha"
                required
                className="w-full border-none outline-none focus:ring-0"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          {loginError && (
            <div className="mb-4 flex items-center bg-red-100 border border-red-300 text-red-800 rounded p-3">
              <svg
                className="w-5 h-5 text-red-600 mr-2"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01M6.938 12.015l-1.464 1.464M17.063 12.015l1.464 1.464M7.485 17.07l1.464-1.464M16.515 17.07l-1.464-1.464"
                />
              </svg>
              E-mail ou senha incorretos.
            </div>
          )}

          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <input type="checkbox" id="remember" className="mr-2" />
              <label htmlFor="remember" className="text-sm text-gray-700">
                Lembre de mim
              </label>
            </div>
            <Link to="#" className="text-sm text-teal-500 hover:underline">
              Esqueceu sua senha?
            </Link>
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-teal-300 to-teal-500 text-white py-2 px-4 rounded-lg shadow-md hover:from-teal-600 hover:to-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:ring-opacity-50"
          >
            Login
          </button>

          <div className="text-center mt-4">
            <p className="text-sm text-gray-600">
              Não tem uma conta?{" "}
              <Link to={"/Registrar"} className="text-teal-500 hover:underline">
                Registrar
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
