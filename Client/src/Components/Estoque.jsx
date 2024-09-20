import  { useState, useEffect } from "react";
import { BarChart } from "@mui/x-charts/BarChart"; // Importa o componente de gráfico de barras do Material-UI
import produtosRepository from "../services/produtosRepository"; // Importa o repositório de produtos

function Estoque() {
  const [produtos, setProdutos] = useState([]); // Estado para armazenar os produtos do estoque

  useEffect(() => {
    async function fetchData() {
      try {
        const produtosBD = await produtosRepository.getAllProdutos(); // Obtém todos os produtos do repositório
        setProdutos(produtosBD); // Atualiza o estado com os produtos obtidos
      } catch (error) {
        console.error("Erro ao buscar dados:", error); // Exibe um erro caso ocorra problema ao buscar os dados
      }
    }

    fetchData(); // Chama a função fetchData para buscar os dados ao montar o componente
  }, []); // Efeito executado apenas uma vez ao montar o componente, devido à dependência vazia []

  // Renderiza o gráfico de barras dentro de um contêiner estilizado com Tailwind CSS
  return (
    <div className="p-6 max-w-4xl mx-auto bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-semibold text-center mb-6">
        Gestão de Estoque
      </h2>
      <div className="relative">
        <BarChart
          series={[{ data: produtos.map((produto) => produto.qnt_estoque) }]} // Configura os dados do gráfico com a quantidade em estoque de cada produto
          height={290}
          xAxis={[
            {
              data: produtos.map((produto) => produto.nome),
              scaleType: "band",
            },
          ]}
          margin={{ top: 10, bottom: 30, left: 40, right: 10 }}
        />
      </div>
    </div>
  );
}

export default Estoque;
