import { useContext } from "react";
import PropTypes from "prop-types";
import AppContext from "../context/AppContext";
import { TrashIcon } from "@heroicons/react/24/solid";

const ItemCarrinho = ({ data }) => {
  const { cartItems, setCartItems } = useContext(AppContext);
  const { id, imagem, nome, preco } = data;

  const handleRemoveItem = () => {
    const updatedItems = cartItems.filter((item) => item.id !== id);
    setCartItems(updatedItems);
  };

  return (
    <div className="flex items-center border border-gray-300 rounded-lg p-4 mb-4 bg-white shadow-lg transition-transform transform hover:scale-105">
      {/* Imagem do produto */}
      <img
        src={imagem}
        alt={nome}
        className="w-20 h-20 object-cover rounded-lg border border-gray-200 shadow-md transition-transform transform hover:scale-110"
      />
      <div className="flex-1 flex flex-col ml-4">
        <div className="flex flex-col justify-between items-center mb-2">
          <span className="text-lg font-semibold text-gray-800 truncate">{nome}</span>
          <span className="text-lg font-medium text-gray-700">{preco}</span>
        </div>
        <button
          aria-label="Remover item do carrinho"
          className="text-red-500 hover:text-red-700 transition-colors duration-150 ease-in-out focus:outline-none"
          onClick={handleRemoveItem}
        >
          <TrashIcon className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

ItemCarrinho.propTypes = {
  data: PropTypes.shape({
    id: PropTypes.string.isRequired,
    imagem: PropTypes.string.isRequired,
    nome: PropTypes.string.isRequired,
    preco: PropTypes.string.isRequired,
  }).isRequired,
};

export default ItemCarrinho;
