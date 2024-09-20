class eCommerceDatabase {
  initConnection(connection) {
    this.connection = connection;
    this.initDatabase();
  }

  initDatabase() {
    this.connection.connect((error) => {
      if (error) {
        console.log("Ocorreu um erro ao conectar no banco de dados...");
        console.log(error.message);
        return;
      }
      this.createDatabase();
    });
  }

  createDatabase() {
    const sql =
      "CREATE DATABASE IF NOT EXISTS db_ecommerce DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci";

    this.connection.query(sql, (error) => {
      if (error) {
        console.log("Ocorreu um erro ao criar o banco de dados...");
        console.log(error.message);
        return;
      }

      this.connection.query("USE db_ecommerce", (error) => {
        if (error) {
          console.log("Ocorreu um erro ao selecionar o banco de dados...");
          console.log(error.message);
          return;
        }
        this.createTable();
      });
    });
  }
  // -- Tabela de Admin
  createTable() {
    const sqlAdmin = `
        CREATE TABLE IF NOT EXISTS db_ecommerce.admin (
          id INT AUTO_INCREMENT PRIMARY KEY,
          nome VARCHAR(255) NOT NULL,
          email VARCHAR(255) NOT NULL UNIQUE,
          senha VARCHAR(255) NOT NULL
        )
      `;

    this.connection.query(sqlAdmin, (error) => {
      if (error) {
        console.log("Ocorreu um erro ao criar a tabela admin...");
        console.log(error.message);
        return;
      }
    });

    const sqlCompradores = `
        CREATE TABLE IF NOT EXISTS db_ecommerce.compradores (
          id INT AUTO_INCREMENT PRIMARY KEY,
          nome VARCHAR(255) NOT NULL,
          email VARCHAR(255) NOT NULL UNIQUE,
          senha VARCHAR(255) NOT NULL,
          telefone VARCHAR(20),
          cpf VARCHAR(20) UNIQUE 
        )
      `;

    this.connection.query(sqlCompradores, (error) => {
      if (error) {
        console.log("Ocorreu um erro ao criar a tabela compradores...");
        console.log(error.message);
        return;
      }
    });

    const sqlCategorias = `
        CREATE TABLE IF NOT EXISTS db_ecommerce.categorias (
          id INT AUTO_INCREMENT PRIMARY KEY,
          nome VARCHAR(255) NOT NULL,
          genero VARCHAR(1) NOT NULL
        )
      `;

    this.connection.query(sqlCategorias, (error) => {
      if (error) {
        console.log("Ocorreu um erro ao criar a tabela categorias...");
        console.log(error.message);
        return;
      }
    });

    const sqlProdutos = `
        CREATE TABLE IF NOT EXISTS db_ecommerce.produtos (
          id INT AUTO_INCREMENT PRIMARY KEY,
          nome VARCHAR(255) NOT NULL,
          preco DECIMAL(10, 2) NOT NULL, 
          descricao_detalhada TEXT, 
          imagem VARCHAR(255) NOT NULL, 
          qnt_estoque INT NOT NULL,
          categoria_id INT, 
          FOREIGN KEY (categoria_id) REFERENCES categorias(id) 
        )
      `;

    this.connection.query(sqlProdutos, (error) => {
      if (error) {
        console.log("Ocorreu um erro ao criar a tabela produtos...");
        console.log(error.message);
        return;
      }
    });

    const sqlCarrinho = `
        CREATE TABLE IF NOT EXISTS db_ecommerce.carrinho (
          id INT AUTO_INCREMENT PRIMARY KEY,
          comprador_id INT,
          produto_id INT,
          quantidade INT NOT NULL, 
          FOREIGN KEY (comprador_id) REFERENCES compradores(id),
          FOREIGN KEY (produto_id) REFERENCES produtos(id) 
        )
      `;

    this.connection.query(sqlCarrinho, (error) => {
      if (error) {
        console.log("Ocorreu um erro ao criar a tabela carrinho...");
        console.log(error.message);
        return;
      }
    });

    const sqlCartoes = `
        CREATE TABLE IF NOT EXISTS db_ecommerce.cartoes (
          id INT AUTO_INCREMENT PRIMARY KEY, 
          comprador_id INT,
          tipo ENUM('credito', 'debito') NOT NULL, 
          nome_titular VARCHAR(255) NOT NULL, 
          numero_cartao VARCHAR(20) NOT NULL, 
          validade DATE NOT NULL, 
          cvv VARCHAR(4) NOT NULL, 
          FOREIGN KEY (comprador_id) REFERENCES compradores(id) 
        )
      `;

    this.connection.query(sqlCartoes, (error) => {
      if (error) {
        console.log("Ocorreu um erro ao criar a tabela cartoes...");
        console.log(error.message);
        return;
      }
    });

    const sqlChats = `
        CREATE TABLE IF NOT EXISTS db_ecommerce.chats (
          id INT AUTO_INCREMENT PRIMARY KEY, 
          comprador_id INT, 
          data_inicio TIMESTAMP DEFAULT CURRENT_TIMESTAMP, 
          FOREIGN KEY (comprador_id) REFERENCES compradores(id) 
        )  
      `;

    this.connection.query(sqlChats, (error) => {
      if (error) {
        console.log("Ocorreu um erro ao criar a tabela chats...");
        console.log(error.message);
        return;
      }
    });

    const sqlCupons = `
        CREATE TABLE IF NOT EXISTS db_ecommerce.cupons (
          id INT AUTO_INCREMENT PRIMARY KEY,
          codigo VARCHAR(50) NOT NULL UNIQUE,
          desconto DECIMAL(5, 2) NOT NULL,
          data_validade DATE NOT NULL
        )
      `;

    this.connection.query(sqlCupons, (error) => {
      if (error) {
        console.log("Ocorreu um erro ao criar a tabela cupons...");
        console.log(error.message);
        return;
      }
    });

    const sqlEnderecos = `
        CREATE TABLE IF NOT EXISTS db_ecommerce.enderecos (
          id INT AUTO_INCREMENT PRIMARY KEY,
          comprador_id INT, 
          endereco VARCHAR(255) NOT NULL, 
          cidade VARCHAR(100) NOT NULL, 
          estado VARCHAR(100) NOT NULL,
          cep VARCHAR(20) NOT NULL, 
          pais VARCHAR(100) NOT NULL, 
          FOREIGN KEY (comprador_id) REFERENCES compradores(id)
        )
      `;

    this.connection.query(sqlEnderecos, (error) => {
      if (error) {
        console.log("Ocorreu um erro ao criar a tabela enderecos...");
        console.log(error.message);
        return;
      }
    });

    const sqlPedidos = `
        CREATE TABLE IF NOT EXISTS db_ecommerce.pedidos (
          id INT AUTO_INCREMENT PRIMARY KEY,
          comprador_id INT,
          data_pedido TIMESTAMP DEFAULT CURRENT_TIMESTAMP, 
          total DECIMAL(10, 2), 
          forma_pagamento VARCHAR(50), 
          status VARCHAR(50) DEFAULT 'pendente',
          endereco_id INT, 
          cupom_id INT, 
          frete DECIMAL(10, 2),
          FOREIGN KEY (comprador_id) REFERENCES compradores(id),
          FOREIGN KEY (endereco_id) REFERENCES enderecos(id),
          FOREIGN KEY (cupom_id) REFERENCES cupons(id) 
        )
      `;

    this.connection.query(sqlPedidos, (error) => {
      if (error) {
        console.log("Ocorreu um erro ao criar a tabela pedidos...");
        console.log(error.message);
        return;
      }
    });

    const sqlHistoricoPedidos = `
        CREATE TABLE IF NOT EXISTS db_ecommerce.historico_pedidos(
            id INT AUTO_INCREMENT PRIMARY KEY, 
            pedido_id INT,
            status VARCHAR(50), 
            data_status TIMESTAMP DEFAULT CURRENT_TIMESTAMP, 
            FOREIGN KEY (pedido_id) REFERENCES pedidos(id)
          )
        `;

    this.connection.query(sqlHistoricoPedidos, (error) => {
      if (error) {
        console.log("Ocorreu um erro ao criar a tabela historico_pedidos...");
        console.log(error.message);
        return;
      }
    });

    const sqlItensPedidos = `
        CREATE TABLE IF NOT EXISTS db_ecommerce.itens_pedidos(
          id INT AUTO_INCREMENT PRIMARY KEY, 
          pedido_id INT, 
          produto_id INT, 
          quantidade INT NOT NULL, 
          preco_unitario DECIMAL(10, 2) NOT NULL, 
          desconto DECIMAL(5, 2) NOT NULL DEFAULT 0, 
          total DECIMAL(10, 2) GENERATED ALWAYS AS (quantidade * (preco_unitario - (preco_unitario * desconto / 100))) STORED,
          FOREIGN KEY (pedido_id) REFERENCES pedidos(id), 
          FOREIGN KEY (produto_id) REFERENCES produtos(id)
        )
      `;

    this.connection.query(sqlItensPedidos, (error) => {
      if (error) {
        console.log("Ocorreu um erro ao criar a tabela itens_pedidos...");
        console.log(error.message);
        return;
      }
    });

    const sqlMensagens = `
        CREATE TABLE IF NOT EXISTS db_ecommerce.mensagens(
          id INT AUTO_INCREMENT PRIMARY KEY, 
          chat_id INT, 
          remetente ENUM('comprador', 'admin') NOT NULL, 
          mensagem TEXT NOT NULL, 
          data_envio TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          FOREIGN KEY (chat_id) REFERENCES chats(id)
        )
      `;

    this.connection.query(sqlMensagens, (error) => {
      if (error) {
        console.log("Ocorreu um erro ao criar a tabela mensagens...");
        console.log(error.message);
        return;
      }
    });

    const sqlPromocoes = `
        CREATE TABLE IF NOT EXISTS db_ecommerce.promocoes(
          id INT AUTO_INCREMENT PRIMARY KEY,
          produto_id INT, 
          desconto DECIMAL(5, 2) NOT NULL, 
          data_inicio DATE NOT NULL, 
          data_fim DATE NOT NULL, 
          FOREIGN KEY (produto_id) REFERENCES produtos(id) 
        )
      `;

    this.connection.query(sqlPromocoes, (error) => {
      if (error) {
        console.log("Ocorreu um erro ao criar a tabela promocoes...");
        console.log(error.message);
        return;
      }
    });
  }
}

module.exports = new eCommerceDatabase();
