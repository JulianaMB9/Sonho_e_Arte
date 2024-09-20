import { CheckCircle } from "@mui/icons-material";

function Sobre() {
  return (
    <div className="flex flex-col items-center justify-center p-8 max-w-4xl mx-auto">
      <div className="bg-white p-10 shadow-2xl rounded-lg border-t-4 border-teal-500">
        {/* Logo */}
        <img
          src="src/assets/logo.png"
          alt="Loja de Acessórios Logo"
          className="w-32 mx-auto mb-6"
        />

        {/* Título Principal */}
        <h2 className="text-5xl font-bold text-teal-700 mb-8 text-center">Sobre</h2>

        {/* Descrição da Loja */}
        <p className="text-lg text-gray-700 mb-6 leading-relaxed">
          A nossa loja de acessórios foi fundada com o objetivo de trazer sofisticação e estilo ao dia a dia. 
          Desde o início, nossa missão tem sido oferecer peças elegantes e de qualidade, que se destacam por seu design e originalidade.
        </p>

        <p className="text-lg text-gray-700 mb-6 leading-relaxed">
          Acreditamos que acessórios são mais do que complementos, são uma forma de expressão pessoal. 
          Nosso compromisso é oferecer uma experiência de compra única, com uma curadoria especial de peças exclusivas e modernas.
        </p>

        {/* Seção de Valores */}
        <h3 className="text-3xl font-bold text-teal-700 mt-10 mb-6">Nossos Valores</h3>
        <ul className="list-none p-0 space-y-4">
          <li className="flex items-center bg-teal-100 p-4 rounded-md shadow-sm">
            <CheckCircle className="w-6 h-6 text-green-600 mr-3" />
            <span className="text-gray-800 font-medium">
              Elegância: Peças cuidadosamente selecionadas para oferecer sofisticação.
            </span>
          </li>
          <li className="flex items-center bg-teal-100 p-4 rounded-md shadow-sm">
            <CheckCircle className="w-6 h-6 text-green-600 mr-3" />
            <span className="text-gray-800 font-medium">
              Qualidade: Acessórios feitos para durar e encantar.
            </span>
          </li>
          <li className="flex items-center bg-teal-100 p-4 rounded-md shadow-sm">
            <CheckCircle className="w-6 h-6 text-green-600 mr-3" />
            <span className="text-gray-800 font-medium">
              Exclusividade: Um portfólio de produtos únicos que não se encontram em qualquer lugar.
            </span>
          </li>
          <li className="flex items-center bg-teal-100 p-4 rounded-md shadow-sm">
            <CheckCircle className="w-6 h-6 text-green-600 mr-3" />
            <span className="text-gray-800 font-medium">
              Atendimento Personalizado: Foco em proporcionar uma experiência de compra especial.
            </span>
          </li>
        </ul>

        {/* Seção de Diferenciais */}
        <h3 className="text-3xl font-bold text-teal-700 mt-10 mb-6">Nossos Diferenciais</h3>
        <ul className="list-none p-0 space-y-4">
          <li className="flex items-center bg-teal-100 p-4 rounded-md shadow-sm">
            <CheckCircle className="w-6 h-6 text-green-600 mr-3" />
            <span className="text-gray-800 font-medium">
              Peças Exclusivas: Seleção de acessórios que combinam com todos os estilos.
            </span>
          </li>
          <li className="flex items-center bg-teal-100 p-4 rounded-md shadow-sm">
            <CheckCircle className="w-6 h-6 text-green-600 mr-3" />
            <span className="text-gray-800 font-medium">
              Design Único: Estilo sofisticado e moderno em cada detalhe.
            </span>
          </li>
          <li className="flex items-center bg-teal-100 p-4 rounded-md shadow-sm">
            <CheckCircle className="w-6 h-6 text-green-600 mr-3" />
            <span className="text-gray-800 font-medium">
              Preços Justos: Beleza e sofisticação acessíveis para todos.
            </span>
          </li>
          <li className="flex items-center bg-teal-100 p-4 rounded-md shadow-sm">
            <CheckCircle className="w-6 h-6 text-green-600 mr-3" />
            <span className="text-gray-800 font-medium">
              Atendimento Exclusivo: Uma experiência única para cada cliente.
            </span>
          </li>
        </ul>

        {/* Seção sobre o diferencial da loja no mercado */}
        <h3 className="text-3xl font-bold text-teal-700 mt-10 mb-6">
          O Que Buscamos Diferenciar no Mercado
        </h3>
        <p className="text-lg text-gray-700 leading-relaxed">
          Nossa loja se destaca pela dedicação à exclusividade e ao design de alta qualidade. 
          Buscamos oferecer uma experiência única, onde cada acessório é uma peça especial que reflete a personalidade do cliente.
        </p>
      </div>
    </div>
  );
}

export default Sobre;
