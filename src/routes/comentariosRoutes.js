const express = require('express');
const router = express.Router();
const comentariosController = require('../controllers/comentariosController');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/manga/:manga_id', comentariosController.getComentariosByManga);
router.post('/', authMiddleware.verifyToken, comentariosController.addComentario);
router.delete('/:id', authMiddleware.verifyToken, comentariosController.deleteComentario);

module.exports = router;
