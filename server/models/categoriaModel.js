const dbConnection = require("../db/dbConnection.js");

class CategoriaModel {
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

  read(genero) {
    const sql = "SELECT * FROM categorias WHERE genero = ?";
    return this.executeSQL(sql, genero);
  }

  readAll() {
    const sql = "SELECT * FROM categorias ";
    return this.executeSQL(sql);
  }

  create(newCategoria) {
    const sql = "INSERT INTO categorias (nome,genero) VALUES (?,?)";
    const values = [newCategoria.nome, newCategoria.genero];
    return this.executeSQL(sql, values);
  }

  update(updatedCategoria, id) {
    const sql = "UPDATE categorias SET nome = ?, genero = ? WHERE id = ?";
    const values = [updatedCategoria.nome, updatedCategoria.genero, id];
    return this.executeSQL(sql, values);
  }

  delete(id) {
    const sql = "DELETE FROM categorias WHERE id = ?";
    return this.executeSQL(sql, id);
  }
}

module.exports = new CategoriaModel();
