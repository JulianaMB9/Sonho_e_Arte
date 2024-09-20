import  { useState, useEffect } from "react";
import produtosRepository from "../services/produtosRepository";
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Close as CloseIcon,
} from "@mui/icons-material";

function TabelaProdutos() {
  const [produtos, setProdutos] = useState([]);
  const [open, setOpen] = useState(false);
  const [currentProduto, setCurrentProduto] = useState({
    id: "",
    nome: "",
    descricao_detalhada: "",
    preco: "",
    qnt_estoque: "",
  });

  useEffect(() => {
    async function fetchData() {
      try {
        const produtosBD = await produtosRepository.getAllProdutos();
        setProdutos(produtosBD);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchData();
  }, []);

  const handleOpen = (produto) => {
    setCurrentProduto(produto);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setCurrentProduto({
      id: "",
      nome: "",
      descricao_detalhada: "",
      preco: "",
      qnt_estoque: "",
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentProduto((prev) => ({ ...prev, [name]: value }));
  };

  const handleEdit = async () => {
    try {
      await produtosRepository.updateProdutos(currentProduto);
      setProdutos((prevProdutos) =>
        prevProdutos.map((produto) =>
          produto.id === currentProduto.id ? currentProduto : produto
        )
      );
      handleClose();
    } catch (error) {
      console.error("Erro ao atualizar produto:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await produtosRepository.deleteProduto(id);
      setProdutos((prevProdutos) =>
        prevProdutos.filter((produto) => produto.id !== id)
      );
    } catch (error) {
      console.error("Erro ao deletar produto:", error);
    }
  };

  return (
    <>
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-semibold text-center mb-4">
          Lista de Produtos
        </h1>

        {produtos.length > 0 && (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-teal-200 rounded-lg shadow-md">
              <thead>
                <tr className="border-b bg-teal-200">
                  <th className="p-4 text-left">ID</th>
                  <th className="p-4 text-left">Nome</th>
                  <th className="p-4 text-left">Descrição</th>
                  <th className="p-4 text-right">Preço</th>
                  <th className="p-4 text-right">Qnt. Estoque</th>
                  <th className="p-4 text-right">Ações</th>
                </tr>
              </thead>
              <tbody>
                {produtos.map((produto) => (
                  <tr key={produto.id} className="border-b">
                    <td className="p-4">{produto.id}</td>
                    <td className="p-4">{produto.nome}</td>
                    <td className="p-4">{produto.descricao_detalhada}</td>
                    <td className="p-4 text-right">{produto.preco}</td>
                    <td className="p-4 text-right">{produto.qnt_estoque}</td>
                    <td className="p-4 text-right flex space-x-2">
                      <button
                        className="text-teal-500 hover:text-teal-700"
                        onClick={() => handleOpen(produto)}
                      >
                        <EditIcon className="w-6 h-6 inline" />
                      </button>
                      <button
                        className="text-red-500 hover:text-red-700"
                        onClick={() => handleDelete(produto.id)}
                      >
                        <DeleteIcon className="w-6 h-6 inline" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Modal */}
        {open && (
          <div className="fixed inset-0 flex items-center justify-center bg-teal-800 bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 max-w-lg">
              <div className="flex justify-between items-center border-b pb-4 mb-4">
                <h2 className="text-lg font-semibold">Editar Produto</h2>
                <button
                  onClick={handleClose}
                  className="text-teal-500 hover:text-teal-700"
                >
                  <CloseIcon className="w-6 h-6" />
                </button>
              </div>
              <form>
                <div className="mb-4">
                  <label
                    htmlFor="nome"
                    className="block text-sm font-medium text-teal-700"
                  >
                    Nome
                  </label>
                  <input
                    id="nome"
                    name="nome"
                    type="text"
                    className="mt-1 block w-full border border-teal-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
                    value={currentProduto.nome}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="descricao_detalhada"
                    className="block text-sm font-medium text-teal-700"
                  >
                    Descrição
                  </label>
                  <input
                    id="descricao_detalhada"
                    name="descricao_detalhada"
                    type="text"
                    className="mt-1 block w-full border border-teal-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
                    value={currentProduto.descricao_detalhada}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="preco"
                    className="block text-sm font-medium text-teal-700"
                  >
                    Preço
                  </label>
                  <input
                    id="preco"
                    name="preco"
                    type="text"
                    className="mt-1 block w-full border border-teal-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
                    value={currentProduto.preco}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="qnt_estoque"
                    className="block text-sm font-medium text-teal-700"
                  >
                    Quantidade
                  </label>
                  <input
                    id="qnt_estoque"
                    name="qnt_estoque"
                    type="text"
                    className="mt-1 block w-full border border-teal-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
                    value={currentProduto.qnt_estoque}
                    onChange={handleChange}
                  />
                </div>
                <button
                  type="button"
                  className="w-full py-2 px-4 bg-teal-500 text-white rounded-md shadow-sm hover:bg-teal-600"
                  onClick={handleEdit}
                >
                  Salvar
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default TabelaProdutos;
