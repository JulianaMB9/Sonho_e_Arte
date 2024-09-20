import { useContext, useState } from "react";
import PropTypes from "prop-types";
import { Outlet, Link } from "react-router-dom";
import {
  Person as PersonIcon,
  MoreVert as MoreVertIcon,
  Apps as AppsIcon,
  Help as HelpIcon,
  Info as InfoIcon,
  Article as ArticleIcon,
  Output as OutputIcon,
  BarChart as BarChartIcon,
  AddCircle as AddCircleIcon,
  TableRows as TableRowsIcon,
} from "@mui/icons-material";
import Logo from "../assets/Logo.png";
import AppContext from "../context/AppContext";
import CarrinhoDeCompras from "./CarrinhoDeCompras";

const drawerWidth = 240;

const SidebarItem = ({ text, icon, route, selected, onClick }) => (
  <Link
    to={route}
    onClick={() => onClick(text)}
    className={`flex items-center p-4 mb-3 text-gray-800 rounded-lg transition-colors duration-300 ${
      selected
        ? "bg-teal-500 text-white shadow-lg"
        : "hover:bg-teal-100 hover:text-teal-900"
    }`}
  >
    <span className="mr-3">{icon}</span>
    <span className="font-medium">{text}</span>
  </Link>
);

SidebarItem.propTypes = {
  text: PropTypes.string.isRequired,
  icon: PropTypes.element.isRequired,
  route: PropTypes.string.isRequired,
  selected: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};

const Sidebar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [selectedItem, setSelectedItem] = useState("Produtos");

  const { logged, setLogged, fullName } = useContext(AppContext);

  const handleMenuClick = (text) => setSelectedItem(text);

  const handleDrawerToggle = () => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen);
    }
  };

  const handleDrawerTransitionEnd = () => setIsClosing(false);

  // Definindo os itens da barra lateral de acordo com o usuário
  const items =
    fullName === "Admin"
      ? [
          {
            text: "Produtos",
            icon: <TableRowsIcon />,
            route: "/",
          },
          {
            text: "Tabela de Produtos",
            icon: <TableRowsIcon />,
            route: "/TabelaProdutos",
          },
          { text: "Estoque", icon: <BarChartIcon />, route: "/estoque" },
          {
            text: "Adicionar Novo Produto",
            icon: <AddCircleIcon />,
            route: "/addNovoProduto",
          },
        ]
      : [
          { text: "Produtos", icon: <AppsIcon />, route: "/" },
          { text: "Histórico", icon: <ArticleIcon />, route: "/historico" },
          {
            text: "Perguntas Frequentes",
            icon: <HelpIcon />,
            route: "/perguntasFrequentes",
          },
          { text: "Sobre", icon: <InfoIcon />, route: "/sobre" },
        ];

  // Definindo o conteúdo da barra lateral
  const drawer = (
    <div className="flex flex-col h-full p-6 bg-gray-100 text-black">
      <div className="flex justify-center mb-6">
        <img src={Logo} alt="Logo" className="w-36 h-auto" />
      </div>

      <div className="flex-1 overflow-y-auto">
        {items.map((item) => (
          <SidebarItem
            key={item.text}
            text={item.text}
            icon={item.icon}
            route={item.route}
            selected={selectedItem === item.text}
            onClick={handleMenuClick}
          />
        ))}
      </div>
      <div className="mt-6">
        {logged ? (
          <button
            onClick={() => setLogged(false)}
            className="flex items-center justify-center p-4 w-full bg-teal-500 text-white rounded-lg transition-transform hover:scale-105"
          >
            <OutputIcon className="mr-2" />
            Sair
          </button>
        ) : (
          <Link to="/Login" className="block">
            <button className="flex items-center justify-center p-4 w-full bg-teal-500 text-white rounded-lg transition-transform hover:scale-105">
              <PersonIcon className="mr-2" />
              Entrar
            </button>
          </Link>
        )}
      </div>
    </div>
  );

  return (
    <div className="flex h-screen">
      {/* Conteúdo principal */}
      <main
        className={`flex-1 p-6 bg-gray-50 transition-all duration-300 ${
          mobileOpen ? "ml-0" : "ml-[240px]"
        }`}
      >
        {fullName !== "Admin" && (
          <CarrinhoDeCompras className="margin-left-0" />
        )}

        <Outlet />
      </main>
      {/* Drawer para modo mobile */}
      <div
        className={`fixed inset-0 bg-gray-800 text-black transition-transform duration-300 ease-in-out md:hidden ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full p-4 bg-white shadow-lg">
          <div className="flex justify-center mb-6">
            <img src={Logo} alt="Logo" className="w-32 h-auto" />
          </div>
          <CarrinhoDeCompras />
          {drawer}
        </div>
      </div>
      {/* Drawer para modo desktop */}
      <div
        className={`hidden md:flex fixed top-0 left-0 bg-teal-700 text-white h-screen transition-width duration-300 ease-in-out ${
          isClosing ? "w-0" : `w-[${drawerWidth}px]`
        }`}
        onTransitionEnd={handleDrawerTransitionEnd}
      >
        {drawer}
      </div>
      {/* Botão de toggle para dispositivos móveis */}
      <button
        className="md:hidden fixed top-4 left-4 text-gray-600 z-20"
        aria-label="Toggle Sidebar"
        onClick={handleDrawerToggle}
      >
        <MoreVertIcon />
      </button>
    </div>
  );
};

Sidebar.propTypes = {
  window: PropTypes.func,
};

export default Sidebar;
