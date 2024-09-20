import React from "react";
import { Link } from "react-router-dom";
import AppContext from "../context/AppContext";
import ItemCarrinho from "./ItemCarrinho";
import Fab from "@mui/material/Fab";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";

export default function CarrinhoDeCompras() {
  const { cartItems, setCartItems, logged } = React.useContext(AppContext);
  const [isOpen, setIsOpen] = React.useState(false);

  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };

  const handleRemoveItem = (id) => {
    const updatedItems = cartItems.filter((item) => item.id !== id);
    setCartItems(updatedItems);
  };

  const totalCompra = cartItems.reduce(
    (acc, item) => acc + parseFloat(item.preco) || 0,
    0
  );

  return (
    <div className="relative">
      {/* Botão para abrir o drawer */}
      <Fab
        onClick={toggleDrawer}
        aria-label="add"
        sx={{
          backgroundColor: "#00897b",
          position: "fixed",
          bottom: 16,
          right: 16,
        }}
      >
        <AddShoppingCartIcon />
        {cartItems.length > 0 && (
          <span className="absolute top-0 right-0 block w-4 h-4 text-white bg-red-500 rounded-full text-xs flex items-center justify-center">
            {cartItems.length}
          </span>
        )}
      </Fab>

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-80 bg-white shadow-lg transform ${
          isOpen ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300 ease-in-out z-40`}
      >
        <div className="flex flex-col h-full">
          <div className="p-4 flex-shrink-0">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Carrinho de Compras
            </h2>
          </div>
          <div className="flex-1 overflow-y-auto p-4">
            {cartItems.length === 0 ? (
              <p className="text-gray-600 text-center">
                Seu carrinho está vazio.
              </p>
            ) : (
              <ul className="space-y-4">
                {cartItems.map((cartItem) => (
                  <li
                    key={cartItem.id}
                    className="flex items-center justify-between py-2 border-b border-gray-200"
                  >
                    <ItemCarrinho data={cartItem} onRemove={handleRemoveItem} />
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div className="p-4 bg-gray-50 border-t border-gray-200">
            <div className="flex justify-between mb-2">
              <span className="text-gray-800 font-semibold">Total:</span>
              <span className="text-gray-800 font-semibold">
                {totalCompra.toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })}
              </span>
            </div>
            <Link to={logged ? "/FinalizarCompra" : "/Login"}>
              <button className="w-full bg-teal-500 text-white px-4 py-2 rounded-lg hover:bg-teal-600 transition-colors duration-300">
                Finalizar Compra
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* Fundo semitransparente */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        } z-30`}
        onClick={toggleDrawer}
      ></div>
    </div>
  );
}
