const express = require('express');
const router = express.Router();
const favoritosController = require('../controllers/favoritosController');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/', authMiddleware.verifyToken, favoritosController.getFavoritosByUsuario);
router.post('/', authMiddleware.verifyToken, favoritosController.addFavorito);
router.delete('/:id', authMiddleware.verifyToken, favoritosController.deleteFavorito);

module.exports = router;
