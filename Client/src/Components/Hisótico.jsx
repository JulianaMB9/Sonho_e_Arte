import { useContext } from "react";
import AppContext from "../context/AppContext";
import CardHistorico from "./CardHistorico";

function Historico() {
  const { historico } = useContext(AppContext);

  // Calcula o total da compra
  const total = historico.reduce((acc, item) => acc + parseFloat(item.preco), 0);

  return (
    <div className="p-4 ml-24"> {/* Ajustado para margem esquerda */}
      {/* Grade flexível para exibir os itens lado a lado */}
      <div className="flex flex-wrap gap-4">
        {historico.map((item, index) => (
          <CardHistorico key={index} data={item} />
        ))}
      </div>

      {/* Exibe o total da compra */}
      <div className="mt-6 p-4 border-t border-gray-300 text-xl font-bold text-right">
        Total da Compra: <span className="text-green-600">R$ {total.toFixed(2)}</span>
      </div>
    </div>
  );
}

export default Historico;
