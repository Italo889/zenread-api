const express = require('express');
const router = express.Router();
const mangasController = require('../controllers/mangasController');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/', mangasController.getMangas);
router.get('/:id', mangasController.getMangaById);
router.post('/', authMiddleware.verifyToken, authMiddleware.isAdmin, mangasController.addManga);
router.put('/:id', authMiddleware.verifyToken, authMiddleware.isAdmin, mangasController.updateManga);
router.delete('/:id', authMiddleware.verifyToken, authMiddleware.isAdmin, mangasController.deleteManga);

module.exports = router;
