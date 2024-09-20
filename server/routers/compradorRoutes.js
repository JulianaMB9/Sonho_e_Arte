const express = require('express');
const router = express.Router();
const compradorController = require('../controllers/compradorController');

router.get('/Login', compradorController.getAllCompradores);
router.post('/Registrar', compradorController.createComprador);
router.get('/:id', compradorController.getCompradorById);
router.put('/:id', compradorController.updateComprador);
router.delete('/:id', compradorController.deleteComprador);

module.exports = router;
