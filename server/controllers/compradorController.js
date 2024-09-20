const CompradorModel = require('../models/compradorModel.js')

exports.getAllCompradores = async (req, res) => {
  try {
    const compradores = await CompradorModel.readList();
    res.status(200).json(compradores);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getCompradorById = async (req, res) => {
  try {
    const comprador = await CompradorModel.read(req.params.id);
    res.status(200).json(comprador);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createComprador = async (req, res) => {
  try {
    const newComprador = req.body;
    await CompradorModel.create(newComprador);
    res.status(201).json({ message: "Comprador criado com sucesso!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateComprador = async (req, res) => {
  try {
    const updatedComprador = req.body;
    await CompradorModel.update(updatedComprador, req.params.id);
    res.status(200).json({ message: "Comprador atualizado com sucesso!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteComprador = async (req, res) => {
  try {
    await CompradorModel.delete(req.params.id);
    res.status(200).json({ message: "Comprador deletado com sucesso!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
