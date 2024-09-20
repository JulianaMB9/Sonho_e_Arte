import { useContext } from "react";
import PropTypes from "prop-types";
import AppContext from "../context/AppContext"; // Importa o contexto da aplicação
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";

function ProdutoCard({ data }) {
  const { cartItems, setCartItems, fullName } = useContext(AppContext); // Usa o contexto para acessar e atualizar o carrinho

  // Função para adicionar o produto ao carrinho
  const handleAddCart = () => setCartItems([...cartItems, data]);
  const { imagem, nome, preco, descricao_detalhada } = data; // Desestrutura as propriedades do produto

  return (
    <Card className="w-full sm:w-96 transition-transform duration-300 hover:scale-105 shadow-lg">
      <CardHeader shadow={false} floated={false} className="h-64 sm:h-96">
        <img src={imagem} alt={nome} className="h-full w-full object-cover" />
      </CardHeader>
      <CardBody>
        <div className="mb-2 flex items-center justify-between">
          <Typography color="blue-gray" className="font-semibold text-lg">
            {nome}
          </Typography>
          {/* Verificação e conversão do preço */}
          <Typography color="blue-gray" className="font-semibold text-lg">
            {typeof preco === "number"
              ? preco.toFixed(2)
              : Number(preco).toFixed(2)}
          </Typography>
        </div>
        <Typography
          variant="small"
          color="gray"
          className="font-normal opacity-75"
        >
          {descricao_detalhada}
        </Typography>
      </CardBody>
      <CardFooter className="pt-4">
        {/* Desabilita o botão se o nome completo for "Admin" */}
        <Button
          onClick={handleAddCart}
          ripple={false}
          fullWidth={true}
          className="bg-teal-500 text-white shadow-lg hover:bg-teal-600 focus:bg-teal-600 active:bg-teal-700 transition-transform hover:scale-105"
          disabled={fullName === "Admin"}
        >
          Adicionar ao carrinho
        </Button>
      </CardFooter>
    </Card>
  );
}

ProdutoCard.propTypes = {
  data: PropTypes.shape({
    nome: PropTypes.string.isRequired,
    imagem: PropTypes.string.isRequired,
    preco: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    descricao_detalhada: PropTypes.string.isRequired,
  }).isRequired, // Define as propriedades esperadas e seus tipos
};

export default ProdutoCard;
