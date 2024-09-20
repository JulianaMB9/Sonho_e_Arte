const dbConnection = require('../db/dbConnection.js')

class AdminModel {
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
    const sql = "SELECT * FROM admin";
    return this.executeSQL(sql);
  }

  read(id) {
    const sql = "SELECT * FROM admin WHERE id = ?";
    return this.executeSQL(sql, id);
  }

  create(newAdmin) {
    const sql = "INSERT INTO admin (nome, email, senha) VALUES (?, ?, ?)";
    const values = [newAdmin.nome, newAdmin.email, newAdmin.senha];
    return this.executeSQL(sql, values);
  }

  update(updatedAdmin, id) {
    const sql = "UPDATE admin SET nome = ?, email = ?, senha = ? WHERE id = ?";
    const values = [updatedAdmin.nome, updatedAdmin.email, updatedAdmin.senha, id];
    return this.executeSQL(sql, values);
  }

  delete(id) {
    const sql = "DELETE FROM admin WHERE id = ?";
    return this.executeSQL(sql, id);
  }
}

module.exports = new AdminModel();
