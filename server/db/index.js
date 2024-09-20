const dbConnection = require("./dbConnection.js");

const db = require("./dbCreate.js");

module.exports = db.initConnection(dbConnection);