const dbConnection = require('../db/dbConnection.js')

class ProdutoModel {
  executeSQL(sql, parameters = "") {
    return new Promise((resolve, reject) => {
      dbConnection.query(sql, parameters, (error, response) => {
        if (error) {
          return reject(error);
        }
        return resolve(response);
      });
    });
  }

  readList() {
    const sql = "SELECT * FROM produtos";
    return this.executeSQL(sql);
  }

  read(nome) {
    const sql = "SELECT nome, preco, descricao_detalhada, imagem, qnt_estoque, categoria_id  FROM produtos WHERE nome LIKE %?%";
    return this.executeSQL(sql, nome);
  }

  create(newProduto) {
    console.log("cheguei no model")
    const sql = "INSERT INTO produtos (nome, preco, descricao_detalhada, imagem, qnt_estoque, categoria_id ) VALUES (?, ?, ?, ?, ?, ?)";
    const values = [newProduto.nome, newProduto.preco, newProduto.descricao_detalhada, newProduto.imagem, newProduto.qnt_estoque, newProduto.categoria_id ];
    return this.executeSQL(sql, values);
  }

  updateImagem(updatedProduto, id) {
    const sql = "UPDATE produtos SET  imagem = ?  WHERE id = ?";
    const values = [updatedProduto.imagem, id];
    return this.executeSQL(sql, values);
  }

  updateProduto(updatedProduto) {
    const sql = "UPDATE produtos SET nome = ?, preco = ?, descricao_detalhada = ?, qnt_estoque = ?  WHERE id = ?";
    const values = [updatedProduto.nome, updatedProduto.preco, updatedProduto.descricao_detalhada, updatedProduto.qnt_estoque, updatedProduto.id];
    return this.executeSQL(sql, values);
  }

  delete(id) {
    const sql = "DELETE FROM produtos WHERE id = ?";
    return this.executeSQL(sql, id);
  }
}

module.exports = new ProdutoModel();
