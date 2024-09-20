import { useContext, useEffect, useState } from "react";
import {
  TextField,
  Button,
  Grid,
  Paper,
  MenuItem,
  Select,
  Alert,
} from "@mui/material"; // Importa componentes da MUI para estilizar a UI
import AppContext from "../context/AppContext"; // Importa o contexto da aplicação
import produtosRepository from "../services/produtosRepository"; // Importa funções para interação com a tabela de produtos
import categoriasRepository from "../services/categoriaRepository"; // Importa funções para interação com a tabela de categorias

/**
 * Componente responsável por renderizar o formulário de cadastro de produtos
 */
export default function FormProdutos() {
  const [file, setFile] = useState(); // Estado para armazenar o arquivo de imagem selecionado
  const [values, setValues] = useState(); // Estado para armazenar valores do formulário
  const [categorias, setCategorias] = useState([]); // Estado para armazenar categorias

  /**
   * Função para atualizar o estado dos valores do formulário
   * @param {object} values - Novos valores do formulário
   */
  const handleChangeValues = (values) => {
    setValues((prevValue) => ({
      ...prevValue,
      [values.target.name]: values.target.value,
    }));
  };

  // Usa o contexto da aplicação para acessar e definir estados compartilhados
  const {
    // eslint-disable-next-line no-unused-vars
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
  } = useContext(AppContext);

  const [showAlert, setShowAlert] = useState(false); // Estado para mostrar o alerta de sucesso

  useEffect(() => {
    // Recupera dados do formulário do localStorage quando o componente é montado
    const storedFormData = JSON.parse(localStorage.getItem("formData")) || {};
    setNome(storedFormData.nome || "");
    setDescricao(storedFormData.descricao || "");
    setPreco(storedFormData.preco || "");
    setQuantidade(storedFormData.quantidade || "");
    setCategoria(storedFormData.categoria || "");
    setSelectedFile(null);
  }, []);

  useEffect(() => {
    /**
     * Função para buscar categorias do repositório quando o componente é montado
     */
    async function fetchData() {
      try {
        // Busca todas as categorias do repositório
        const categoriasBD = await categoriasRepository.getCategoriasAll();
        console.log(categoriasBD);
        // Atualiza o estado com as categorias obtidas
        setCategorias(categoriasBD);
      } catch (error) {
        console.error("Erro ao buscar categorias:", error);
      }
    }

    fetchData();
  }, []);

/*************  ✨ Codeium Command 🌟  *************/
  /**
   * Função para lidar com o envio do formulário
   * @param {object} e - Evento de submissão do formulário
   * @description
   * - Gera um novo produto com os dados do formulário
   * - Envia o produto para o repositório
   * - Mostra um alerta de sucesso
   * - Reseta os campos do formulário
   */
  const handleSubmit = (e) => {
    e.preventDefault(); // Define o comportamento padrão do formulário

    // Verifica se o usuário selecionou uma imagem
    if (!file) {
      alert("Por favor, selecione uma imagem para o produto.");
      return;
    }

    // Monta o produto conforme os dados do formulário
    const produtoCreate = {
      nome: values.nome,
      preco: values.preco,
      descricao_detalhada: values.descricao_detalhada,
      imagem: `../src/assets/${file.name}`,
      qnt_estoque: values.qnt_estoque,
      categoria_id: categoria,
    };

    // Envia o produto para o repositório
    produtosRepository.createProdutos(produtoCreate).then((response) => {
      // Monta o produto conforme os dados do formulário

      const prodId = response.insertId;
      const formData = new FormData();
      formData.append("image", file);
      formData.append("id", prodId);
      produtosRepository.uploadImage(formData);
    });

    if (!file) {
      alert("Por favor, selecione uma imagem para o produto.");
      return;
    }

    const novoProduto = {
      id: crypto.randomUUID(),
      nome: nome,
      descricao: descricao,
      preco: preco,
      quantidade: quantidade,
      categoria: categoria,
      imagem: file.name,
    };

    setProdutos([...produtos, novoProduto]);

    // Reseta os campos do formulário
    setSelectedFile(null);
    setNome("");
    setDescricao("");
    setPreco("");
    setQuantidade("");
    setCategoria("");

    localStorage.removeItem("formData");

    // Mostra um alerta de sucesso
    setShowAlert(true);
    setTimeout(() => {
      setShowAlert(false);
    }, 3000);
  };
/******  2c9d96f2-31ba-4d2b-b2c7-8231e19e46d1  *******/

  /**
   * Função para lidar com a alteração do arquivo de imagem selecionado
   * @param {object} e - Evento de alteração do arquivo de imagem
   */
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  return (
    <Paper elevation={3} style={{ padding: 20, marginLeft: 30 }}>
      <form onSubmit={handleSubmit} onChange={handleChangeValues}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Nome"
              name="nome"
              variant="outlined"
              fullWidth
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              required
              color="#4db6ac"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              color="#4db6ac"
              label="Descrição"
              name="descricao_detalhada"
              variant="outlined"
              fullWidth
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              color="#4db6ac"
              label="Preço"
              name="preco"
              variant="outlined"
              fullWidth
              type="number"
              value={preco}
              onChange={(e) => setPreco(e.target.value)}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              color="#4db6ac"
              label="Imagem Selecionada"
              name="imagem"
              variant="outlined"
              fullWidth
              value={file ? file.name : ""}
              InputProps={{
                readOnly: true,
              }}
              required
            />
            <input
              accept="image/*"
              style={{ display: "none" }}
              id="image-upload-button"
              type="file"
              onChange={handleFileChange}
              required
            />
            <label htmlFor="image-upload-button">
              <Button
                variant="outlined"
                component="span"
                color="#4db6ac"
                sx={{ backgroundColor: "#4db6ac" }}
              >
                Escolher Imagem
              </Button>
            </label>
          </Grid>
          <Grid item xs={12}>
            <TextField
              color="#4db6ac"
              label="Quantidade estoque"
              name="qnt_estoque"
              variant="outlined"
              fullWidth
              type="number"
              value={quantidade}
              onChange={(e) => setQuantidade(e.target.value)}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <Select
              label="Categoria"
              name="categoria_id"
              variant="outlined"
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              fullWidth
              value={categoria}
              required
              onChange={(e) => setCategoria(e.target.value)}
              color="#4db6ac"
            >
              {categorias.map((categoria) => (
                <MenuItem
                  value={categoria.id}
                  key={categoria.id}
                  onSelect={(e) => setCategorias(e.target.value)}
                >
                  {categoria.nome} ({categoria.genero})
                </MenuItem>
              ))}
            </Select>
          </Grid>
          <Grid item xs={12}>
            <Button
              type="submit"
              variant="contained"
              color="#4db6ac"
              sx={{ backgroundColor: "#4db6ac" }}
            >
              Adicionar Produto
            </Button>
          </Grid>
        </Grid>
      </form>

      {showAlert && (
        <div style={{ marginTop: 10 }}>
          <Alert severity="#4db6ac">Produto adicionado com sucesso!</Alert>
        </div>
      )}
    </Paper>
  );
}
