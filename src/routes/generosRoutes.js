const express = require('express');
const router = express.Router();
const generosController = require('../controllers/generosController');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/', generosController.getGeneros);
router.get('/:id', generosController.getGeneroById);
router.post('/', authMiddleware.verifyToken, authMiddleware.isAdmin, generosController.addGenero);
router.put('/:id', authMiddleware.verifyToken, authMiddleware.isAdmin, generosController.updateGenero);
router.delete('/:id', authMiddleware.verifyToken, authMiddleware.isAdmin, generosController.deleteGenero);

module.exports = router;
