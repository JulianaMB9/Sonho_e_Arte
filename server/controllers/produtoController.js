const ProdutoModel = require('../models/produtoModel.js')


exports.getAllProdutos = async (req, res) => {
  try {
    const produtos = await ProdutoModel.readList();
    res.status(200).json(produtos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

 exports.createProduto = async (req, res) => {
  try {
    const newProduto =req.body
    const produto = await ProdutoModel.create(newProduto);
    res.status(201).json(produto);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



exports.getProdutoByName = async (req, res) => {
  try {
    const produto = await ProdutoModel.read(req.params.nome);
    if (produto) {
      res.json(produto);
    } else {
      res.status(404).json({ message: 'Produto não encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateImagemProduto = async (req, res) => {
  try {
    console.log(req.body)
    const updatedProduto = req.body.file.filename;
    console.log(updatedProduto)
    const produto = await ProdutoModel.updateImagem(updatedProduto, req.id);
    res.json(produto);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateProduto = async (req, res) => {
  try {
    const newData =req.body
    const produto = await ProdutoModel.updateProduto(newData);
    res.status(201).json(produto);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteProduto = async (req, res) => {
  try {
    await ProdutoModel.delete(req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};