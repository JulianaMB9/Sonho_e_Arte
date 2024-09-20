import api from "./Base/api"; // Importa o objeto 'api' de um arquivo específico que contém métodos para fazer requisições HTTP

const categoriasRepository = {
  // Objeto categoriasRepository que contém métodos para interagir com endpoints relacionados a categorias

  createCategorias: async (data) => {
    // Método para criar uma nova categoria
    console.log(data); // Registra os dados recebidos no console
    try {
      const response = await api.post(`/categorias`, data); // Faz uma requisição POST para o endpoint '/categorias' utilizando o objeto 'api' e enviando os dados recebidos
      console.log("response.data", response.data); // Registra os dados recebidos da resposta da API no console
      return response.data; // Retorna os dados recebidos da resposta da API
    } catch (error) {
      console.error(`Erro ao criar categorias:`, error); // Se ocorrer um erro, registra o erro no console
      throw error; // Lança o erro para ser tratado pelo código que chama este método
    }
  },

  getCategoriasAll: async () => {
    // Método para buscar todas as categorias
    try {
      const response = await api.get("http://localhost:3000/categorias"); // Faz uma requisição GET para o endpoint 'http://localhost:3000/categorias' utilizando o objeto 'api'
      return response.data; // Retorna os dados recebidos da resposta da API
    } catch (error) {
      console.error(`Erro ao buscar categorias `, error); // Se ocorrer um erro, registra o erro no console
      throw error; // Lança o erro para ser tratado pelo código que chama este método
    }
  },

  getCategoriasByGenero: async (genero) => {
    // Método para buscar categorias por gênero
    try {
      if (genero === "M") {
        const response = await api.get("http://localhost:3000/categorias/M"); // Faz uma requisição GET para o endpoint 'http://localhost:3000/categorias/M' utilizando o objeto 'api'
        return response.data; // Retorna os dados recebidos da resposta da API
      } else if (genero === "F") {
        const response = await api.get("http://localhost:3000/categorias/F"); // Faz uma requisição GET para o endpoint 'http://localhost:3000/categorias/F' utilizando o objeto 'api'
        return response.data; // Retorna os dados recebidos da resposta da API
      }
    } catch (error) {
      console.error(
        `Erro ao buscar categorias com esse genero:${genero}`,
        error
      ); // Se ocorrer um erro, registra o erro no console
      throw error; // Lança o erro para ser tratado pelo código que chama este método
    }
  },

  updateCategorias: async (id) => {
    // Método para atualizar uma categoria por ID
    try {
      const response = await api.get(`/categorias/${id}`); // Faz uma requisição GET para o endpoint '/categorias/${id}' utilizando o objeto 'api'
      return response.data; // Retorna os dados recebidos da resposta da API
    } catch (error) {
      console.error(`Erro ao atualizar categorias:`, error); // Se ocorrer um erro, registra o erro no console
      throw error; // Lança o erro para ser tratado pelo código que chama este método
    }
  },

  deleteCategorias: async (id) => {
    // Método para deletar uma categoria por ID
    try {
      const response = await api.get(`/categorias/${id}`); // Faz uma requisição GET para o endpoint '/categorias/${id}' utilizando o objeto 'api'
      return response.data; // Retorna os dados recebidos da resposta da API
    } catch (error) {
      console.error(`Erro ao deletar categorias:`, error); // Se ocorrer um erro, registra o erro no console
      throw error; // Lança o erro para ser tratado pelo código que chama este método
    }
  },
};

export default categoriasRepository;
