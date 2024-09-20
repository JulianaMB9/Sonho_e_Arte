const dbConnection = require('../db/dbConnection.js')

class CompradorModel {
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
    const sql = "SELECT * FROM compradores";
    return this.executeSQL(sql);
  }

  read(id) {
    const sql = "SELECT * FROM compradores WHERE id = ?";
    return this.executeSQL(sql, id);
  }

  create(newComprador) {
    const sql = "INSERT INTO compradores (nome, email, senha, telefone, cpf) VALUES (?, ?, ?, ?, ?)";
    const values = [newComprador.nome, newComprador.email, newComprador.senha, newComprador.telefone, newComprador.cpf];
    return this.executeSQL(sql, values);
  }

  update(updatedComprador, id) {
    const sql = "UPDATE compradores SET nome = ?, email = ?, senha = ?, telefone = ? WHERE id = ?";
    const values = [updatedComprador.nome, updatedComprador.email, updatedComprador.senha, updatedComprador.telefone, updatedComprador.cpf ,id];
    return this.executeSQL(sql, values);
  }

  delete(id) {
    const sql = "DELETE FROM compradores WHERE id = ?";
    return this.executeSQL(sql, id);
  }
}

module.exports = new CompradorModel();
