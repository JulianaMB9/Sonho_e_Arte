const searchModel = require('../models/searchModel.js')


exports.searchNome = async (req, res) => {
  try {
    const data = req.body.data
    const search = await searchModel.searchList(data);
    res.status(201).json(search);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};