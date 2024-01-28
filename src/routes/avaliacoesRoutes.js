const express = require('express');
const router = express.Router();
const avaliacoesController = require('../controllers/avaliacoesController');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/manga/:manga_id', avaliacoesController.getAvaliacoesByManga);
router.post('/', authMiddleware.verifyToken, avaliacoesController.addAvaliacao);
router.put('/:id', authMiddleware.verifyToken, avaliacoesController.updateAvaliacao);

module.exports = router;
