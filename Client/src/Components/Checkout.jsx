import { useState, useContext } from "react";
import AppContext from "../context/AppContext";
import Logo from "../assets/Logo.png";
import { Link } from "react-router-dom";

const ArrowBackIcon = () => (
  <svg
    className="w-6 h-6 text-teal-600"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M15 19l-7-7 7-7"
    />
  </svg>
);

function Checkout() {
  const [paid, setPaid] = useState(false);
  const [formaPagamento, setFormaPagamento] = useState(""); // Estado para a forma de pagamento
  const { cartItems, setCartItems, setHistorico } = useContext(AppContext);

  const totalCompra = cartItems.reduce((acc, item) => {
    return parseFloat(item.preco) + acc;
  }, 0);

  const [formularioCep, setFormularioCep] = useState({
    nome: "",
    endereco: "",
    cidade: "",
    estado: "",
    cep: "",
    telefone: "",
  });

  const [paymentInfo, setPaymentInfo] = useState({
    numeroCartao: "",
    validade: "",
    cvv: "",
  });

  const handleChangeCep = (e) => {
    const { name, value } = e.target;
    setFormularioCep({
      ...formularioCep,
      [name]: value,
    });
  };

  const handleChangePayment = (e) => {
    const { name, value } = e.target;
    setPaymentInfo({
      ...paymentInfo,
      [name]: value,
    });
  };

  const handleFormaPagamentoChange = (e) => {
    setFormaPagamento(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulação de pagamento bem-sucedido
    setPaid(true);
    setHistorico(cartItems);
    setCartItems([]);
  };

  return (
    <div className="max-w-4xl mx-auto my-10 p-8 bg-white shadow-lg rounded-lg">
      {paid ? (
        <div className="text-center">
          <div className="bg-green-100 text-green-800 p-4 rounded mb-4">
            Compra finalizada com sucesso!
          </div>
          <Link
            to="/"
            className="inline-flex items-center text-teal-500 hover:underline"
          >
            <ArrowBackIcon />
            <span className="ml-2">Voltar para página principal</span>
          </Link>
        </div>
      ) : (
        <div>
          <div className="flex items-center mb-10">
            <img src={Logo} alt="Logo" className="w-32 h-auto mr-8" />
            <h2 className="text-3xl font-bold text-teal-800">
              Finalizar Compra
            </h2>
          </div>

          <div className="border-t border-teal-300 my-6"></div>

          <h3 className="text-2xl font-semibold text-teal-700 mb-4">
            Resumo da Compra
          </h3>

          <div className="border border-teal-300 p-6 rounded-lg mb-6 bg-teal-50">
            {cartItems.map((cartItem) => (
              <div key={cartItem.id} className="flex items-center mb-4">
                <img
                  src={cartItem.imagem}
                  alt={cartItem.nome}
                  loading="lazy"
                  className="w-24 h-auto mr-4 rounded"
                />
                <div>
                  <p className="text-lg font-medium text-teal-800">
                    {cartItem.nome}
                  </p>
                  <p className="text-sm text-teal-600">
                    {cartItem.descricao_detalhada}
                  </p>
                  <p className="text-lg font-semibold text-teal-900">
                    R$ {cartItem.preco}
                  </p>
                </div>
              </div>
            ))}
            <h2 className="text-xl font-semibold text-teal-900">
              Total da compra: R$ {totalCompra.toFixed(2)}
            </h2>
          </div>

          <h3 className="text-xl font-semibold text-teal-700 mb-4">
            Dados de entrega
          </h3>
          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 gap-4 md:grid-cols-2"
          >
           
            {["nome", "endereco", "cidade", "estado", "cep", "telefone"].map(
              (item) => (
                <div key={item}>
                  <label className="block text-sm font-medium text-teal-700">
                    {item.charAt(0).toUpperCase() + item.slice(1)}
                  </label>
                  <input
                    type="text"
                    name={item}
                    value={formularioCep[item]}
                    onChange={handleChangeCep}
                    required
                    className="w-full p-3 border border-teal-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>
              )
            )}
          </form>

          <h3 className="text-xl font-semibold text-teal-700 mt-8 mb-4">
            Forma de pagamento
          </h3>

          <div className="mb-6">
            <label className="block text-sm font-medium text-teal-700 mb-2">
              Escolha a forma de pagamento
            </label>
            <select
              value={formaPagamento}
              onChange={handleFormaPagamentoChange}
              className="w-full p-3 border border-teal-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
            >
              <option className="bg-teal-50 hover:bg-teal-100" value="">
                Selecione
              </option>
              <option className="bg-teal-50 hover:bg-teal-100" value="dinheiro">
                Dinheiro
              </option>
              <option className="bg-teal-50 hover:bg-teal-100" value="cartao">
                Cartão
              </option>
            </select>
          </div>

          {formaPagamento === "cartao" && (
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 mb-6">
              {["numeroCartao", "validade", "cvv"].map((item) => (
                <div key={item}>
                  <label className="block text-sm font-medium text-teal-700">
                    {item === "numeroCartao"
                      ? "Número do Cartão"
                      : item.charAt(0).toUpperCase() + item.slice(1)}
                  </label>
                  <input
                    type="text"
                    name={item}
                    value={paymentInfo[item]}
                    onChange={handleChangePayment}
                    required
                    className="w-full p-3 border border-teal-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>
              ))}
            </div>
          )}

          <button
            onClick={handleSubmit}
            className="w-full py-3 bg-teal-600 text-white font-semibold rounded-lg hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500"
          >
            Finalizar Pagamento
          </button>

          <Link
            to="/"
            className="inline-flex items-center text-teal-500 hover:underline mt-4"
          >
            <ArrowBackIcon />
            <span className="ml-2 text-teal-800">
              Voltar para página principal
            </span>
          </Link>
        </div>
      )}
    </div>
  );
}

export default Checkout;
