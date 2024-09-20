import PropTypes from 'prop-types';

function CardHistorico({ data }) {
  const { imagem, nome, preco } = data;

  return (
    <div className="border border-gray-300 p-4 rounded-lg shadow-lg flex flex-col items-center w-48">
      <img
        src={imagem}
        alt={nome}
        className="w-32 h-32 object-cover rounded mb-4"
      />
      <h2 className="text-lg font-semibold text-gray-800">{nome}</h2>
      <h2 className="text-lg font-semibold text-gray-800">
        R$ {parseFloat(preco).toFixed(2)}
      </h2>
    </div>
  );
}

CardHistorico.propTypes = {
  data: PropTypes.shape({
    nome: PropTypes.string.isRequired,
    imagem: PropTypes.string.isRequired,
    preco: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  }).isRequired,
};

export default CardHistorico;
