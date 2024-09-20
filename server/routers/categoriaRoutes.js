const express = require('express');
const router = express.Router();
const categoriaController = require('../controllers/categoriaController');

router.post('/', categoriaController.createCategoria);
router.get('/categorias', categoriaController.getCategoriasAll);
router.get('/categorias/M', categoriaController.getCategoriasByMale);
router.get('/categorias/F', categoriaController.getCategoriasByFemale);
router.put('/:id', categoriaController.updateCategoria);
router.delete('/:id', categoriaController.deleteCategoria);

module.exports = router;
