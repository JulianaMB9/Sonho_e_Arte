const express = require("express");
const router = express.Router();
const produtoController = require("../controllers/produtoController");
const multer = require("multer");
const path = require("path");
const dbConnection = require("../db/dbConnection.js");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "../src/assets/");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "_" + Date.now() + path.extname(file.originalname)
    );
  },
});
const upload = multer({
  storage: storage,
});

router.get("/produtos", produtoController.getAllProdutos);
router.post("/produtos", produtoController.createProduto);
router.post("/produto", upload.single("image"), (req, res) => {
  const id = req.body.id;
  const image = req.file.destination.slice(10) + req.file.filename;
  const sql = "Update produtos SET imagem = ? WHERE id = ?";
  dbConnection.query(sql, [image, id], (err, result) => {
    if (err) return res.json({ Message: "Error" });
    return res.json({ Status: "Success" });
  });
});
router.put("/produto", produtoController.updateProduto);
router.delete("/produtos/:id", produtoController.deleteProduto);

module.exports = router;
