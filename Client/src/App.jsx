import Sidebar from "./Components/Sidebar"; // Importa o componente Sidebar
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"; // Importa elementos de roteamento do React Router
import "./styles.global.css"; // Importa um arquivo de estilos globais (possível erro de digitação em 'styles.global.css')
import Provider from "./context/Provider"; // Importa o componente Provider de um contexto específico
import FormProdutos from "./Components/FormProdutos"; // Importa o componente FormProdutos
import Produtos from "./Components/Produtos"; // Importa o componente Produtos
import Sobre from "./Components/Sobre"; // Importa o componente Sobre
import PerguntasFrequentes from "./Components/PerguntasFrequentes"; // Importa o componente PerguntasFrequentes

import TabelaProdutos from "./Components/TabelaProdutos"; // Importa o componente TabelaProdutos
import Login from "./Components/Login"; // Importa o componente Login
import Registrar from "./Components/Registrar"; // Importa o componente Registrar
import Estoque from "./Components/Estoque"; // Importa o componente Estoque
import Checkout from "./Components/Checkout"; // Importa o componente Checkout
import Historico from "./Components/Hisótico";

function App() {
  return (
    <>
      <Provider>
        {" "}
        {/* Renderiza o componente Provider para prover contexto aos Components abaixo */}
        <Router>
          {" "}
          {/* Define o componente Router para gerenciar as rotas */}
          <Routes>
            {" "}
            {/* Define as rotas dentro do componente Routes */}
            <Route path="/" element={<Sidebar />}>
              {" "}
              {/* Rota principal que renderiza o Sidebar */}
              <Route index element={<Produtos />} />{" "}
              {/* Rota para renderizar o componente Produtos na página inicial */}
              {/* Rota para renderizar o componente Search */}
              {/* Rota para renderizar o componente Categorias */}
              <Route path="/historico" element={<Historico />} />{" "}
              {/* Rota para renderizar o componente FormProdutos */}
              <Route path="/sobre" element={<Sobre />} />{" "}
              {/* Rota para renderizar o componente Sobre */}
              <Route path="/pix" element={<Checkout />} />{" "}
              {/* Rota para renderizar o componente Checkout */}
              {/* Rota para renderizar o componente Chat */}
              <Route
                path="/perguntasFrequentes"
                element={<PerguntasFrequentes />}
              />{" "}
              <Route path="/TabelaProdutos" element={<TabelaProdutos />} />{" "}
              {/* Rota para renderizar o componente TabelaProdutos */}
              <Route path="/estoque" element={<Estoque />} />{" "}
              {/* Rota para renderizar o componente Estoque */}
              <Route path="/addNovoProduto" element={<FormProdutos />} />{" "}
              {/* Rota para renderizar o componente FormProdutos */}
              {/* Rota para renderizar o componente Dashboard */}
            </Route>
            <Route path="/Login" element={<Login />} />{" "}
            {/* Rota para renderizar o componente Login */}
            <Route path="/Registrar" element={<Registrar />} />{" "}
            {/* Rota para renderizar o componente Registrar */}
            <Route path="/FinalizarCompra" element={<Checkout />} />{" "}
            {/* Comentado, não utilizado neste momento */}
          </Routes>
        </Router>
      </Provider>
    </>
  );
}

export default App;
