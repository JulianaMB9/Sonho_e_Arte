import { useState, useContext } from "react";
import { Link, Navigate } from "react-router-dom";
import Logo from "../assets/Logo.png";
import CompradorRepository from "../services/CompradorRepository";
import AppContext from "../context/AppContext";

const Registrar = () => {
  const [showAlert, setShowAlert] = useState(false);
  const [redirectToLogin, setRedirectToLogin] = useState(false);
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [telefone, setTelefone] = useState("");
  const [cpf, setCpf] = useState("");
  const [values, setValues] = useState({});
  const { nome, setNome } = useContext(AppContext);

  const handleSubmit = (event) => {
    event.preventDefault();
    setShowAlert(true);
    setTimeout(() => {
      setShowAlert(false);
      setRedirectToLogin(true);
    }, 1000);
  };

  if (redirectToLogin) {
    return <Navigate to="/Login" replace={true} />;
  }

  const handleChangeValues = (values) => {
    setValues((prevValue) => ({
      ...prevValue,
      [values.target.name]: values.target.value,
    }));
  };

  const handleClickButton = () => {
    CompradorRepository.createComprador({
      nome: values.nome,
      email: values.email,
      senha: values.senha,
      telefone: values.telefone,
      cpf: values.cpf,
    }).then((response) => {
      console.log(response);
    });
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border border-gray-200 rounded-lg shadow-lg bg-white">
      <form onSubmit={handleSubmit} onChange={handleChangeValues}>
        <div className="text-center mb-6">
          <Link to={"/"}>
            <img src={Logo} alt="Logo" className="w-28 mx-auto mb-4" />
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">Registrar</h1>
        </div>
        <div className="mb-5">
          <label
            className="block text-sm font-medium text-gray-600"
            htmlFor="nome"
          >
            Nome completo
          </label>
          <input
            type="text"
            id="nome"
            name="nome"
            required
            className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />
        </div>
        <div className="mb-5">
          <label
            className="block text-sm font-medium text-gray-600"
            htmlFor="email"
          >
            E-mail
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-5">
          <label
            className="block text-sm font-medium text-gray-600"
            htmlFor="senha"
          >
            Senha
          </label>
          <input
            type="password"
            id="senha"
            name="senha"
            required
            className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
          />
        </div>
        <div className="mb-5">
          <label
            className="block text-sm font-medium text-gray-600"
            htmlFor="telefone"
          >
            Telefone
          </label>
          <input
            type="tel"
            id="telefone"
            name="telefone"
            className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
            value={telefone}
            onChange={(e) => setTelefone(e.target.value)}
          />
        </div>
        <div className="mb-5">
          <label
            className="block text-sm font-medium text-gray-600"
            htmlFor="cpf"
          >
            CPF
          </label>
          <input
            type="text"
            id="cpf"
            name="cpf"
            className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
            value={cpf}
            onChange={(e) => setCpf(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className="w-full px-4 py-2 bg-teal-500 text-white rounded-lg shadow hover:bg-teal-600 transition-colors"
          onClick={() => handleClickButton()}
        >
          Registrar
        </button>
        <div className="mt-5 text-center">
          <p>
            Já tem uma conta?{" "}
            <Link to="/Login" className="text-teal-500 hover:underline">
              Login
            </Link>
          </p>
        </div>
        {showAlert && (
          <div className="mt-5">
            <div
              className="p-4 text-sm text-teal-700 bg-teal-100 rounded-lg"
              role="alert"
            >
              Registro concluído com sucesso!
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

export default Registrar;
