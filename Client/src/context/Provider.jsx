import { useState, useEffect } from "react";
import AppContext from "./AppContext";
import PropTypes from "prop-types";

function Provider({ children }) {
  const [selectedFile, setSelectedFile] = useState();
  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [preco, setPreco] = useState("");
  const [quantidade, setQuantidade] = useState("");
  const [categoria, setCategoria] = useState("");
  const [loading, setLoading] = useState(true);
  const [produtos, setProdutos] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [historico, setHistorico] = useState([]);
  const [logged, setLogged] = useState();
  const [fullName, setFullName] = useState("");

  useEffect(() => {
    const salvarCartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    if (salvarCartItems.length > 0) {
      setCartItems(salvarCartItems);
    }
  }, [setCartItems]);

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    localStorage.setItem("historico", JSON.stringify(historico));
  }, [historico]);

  useEffect(() => {
    const salvarLogged = localStorage.getItem("logged");
    setLogged(salvarLogged);
  }, [setLogged]);

  useEffect(() => {
    localStorage.setItem("logged", JSON.stringify(logged));
  }, [logged]);

  const value = {
    historico,
    setHistorico,
    loading,
    setLoading,
    selectedFile,
    setSelectedFile,
    nome,
    setNome,
    descricao,
    setDescricao,
    preco,
    setPreco,
    quantidade,
    setQuantidade,
    categoria,
    setCategoria,
    produtos,
    setProdutos,
    cartItems,
    setCartItems,
    logged,
    setLogged,
    fullName,
    setFullName,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

Provider.propTypes = {
  children: PropTypes.any.isRequired,
};

export default Provider;
