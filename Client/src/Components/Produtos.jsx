import { useState, useEffect } from "react";
import ProdutoCard from "./ProdutoCard"; // Importa o componente para exibir cada produto
import produtosRepository from "../services/produtosRepository"; // Importa o serviço para buscar produtos

function Produtos() {
  const [produtos, setProdutos] = useState([]); // Estado para armazenar a lista de produtos

  // useEffect para buscar produtos ao carregar o componente
  useEffect(() => {
    async function fetchData() {
      try {
        const produtosBD = await produtosRepository.getAllProdutos(); // Busca produtos do repositório
        setProdutos(produtosBD); // Atualiza o estado com os produtos obtidos
      } catch (error) {
        console.error("Error fetching data:", error); // Exibe erro no console se a busca falhar
      }
    }

    fetchData(); // Chama a função de busca de dados
  }, []); // Executa apenas uma vez ao carregar o componente

  return (
    <div className="p-5">
      {/* Layout com Grid para exibir os cards em colunas responsivas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {produtos.length > 0 ? (
          produtos.map((produto) => (
            <ProdutoCard key={produto.id} data={produto} /> // Renderiza ProdutoCard para cada produto
          ))
        ) : (
          <p className="text-center mt-12 text-lg text-gray-600">
            Nenhum produto encontrado. :(
          </p>
        )}
      </div>
    </div>
  );
}

export default Produtos;
