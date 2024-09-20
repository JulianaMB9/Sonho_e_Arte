function PerguntasFrequentes() {
  // Array de objetos contendo as perguntas e respostas frequentes
  const faqItems = [
    {
      question: "O que é a Sonho & Arte?",
      answer:
        "A Sonho & Arte é uma loja de acessórios fundada em 2018 com o objetivo de oferecer peças exclusivas e promover a moda sustentável.",
    },
    {
      question: "Como posso comprar na Sonho & Arte?",
      answer:
        "Você pode comprar na Sonho & Arte através da nossa loja online. Adicione os acessórios desejados ao carrinho, siga para o checkout e conclua a compra de forma rápida e segura.",
    },
    {
      question: "Quais são as formas de pagamento aceitas?",
      answer:
        "Aceitamos diversas formas de pagamento, incluindo cartões de crédito, débito e Pix. Veja todas as opções disponíveis na página de checkout.",
    },
    {
      question: "Qual é a política de devolução da Sonho & Arte?",
      answer:
        "Você pode devolver seus acessórios em até 30 dias após a compra, desde que estejam em sua condição original e com etiquetas. Acesse nossa página de política de devolução para mais detalhes.",
    },
  ];

  // Função para alternar a visibilidade das respostas
  const toggleAnswer = (index) => {
    const element = document.getElementById(`answer-${index}`);
    if (element) {
      element.classList.toggle("hidden");
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      {/* Container principal com borda superior verde */}
      <div className="bg-white shadow-lg rounded-lg p-6 border-t-4 border-teal-500">
        {/* Título da seção */}
        <h1 className="text-3xl font-bold text-center text-teal-600 mb-8">
          Perguntas Frequentes
        </h1>
        {/* Mapeia os itens de FAQ e cria um acordeão para cada um */}
        {faqItems.map((item, index) => (
          <div key={index} className="mb-4">
            <button
              className="w-full text-left py-2 px-4 bg-teal-50 border border-gray-300 rounded-lg flex justify-between items-center"
              onClick={() => toggleAnswer(index)}
            >
              <span className="text-lg font-semibold text-teal-600">
                {item.question}
              </span>
              {/* Ícone de seta usando Tailwind CSS */}
              <svg
                className="w-6 h-6 text-gray-500 transform transition-transform duration-200"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <div id={`answer-${index}`} className="hidden mt-2 text-gray-700">
              <p>{item.answer}</p>
            </div>
          </div>
        ))}
        <div className="my-8 border-t border-gray-300"></div>
      </div>
    </div>
  );
}

export default PerguntasFrequentes;
