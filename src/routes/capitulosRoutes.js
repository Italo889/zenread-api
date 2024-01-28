const express = require('express');
const router = express.Router();
const capitulosController = require('../controllers/capitulosController');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/manga/:manga_id', capitulosController.getCapitulosByManga);
router.post('/', 
    authMiddleware.verifyToken, 
    authMiddleware.isAdmin, 
    capitulosController.addCapitulo
);
router.put('/:id', 
    authMiddleware.verifyToken, 
    authMiddleware.isAdmin, 
    capitulosController.updateCapitulo
);
router.delete('/:id', 
    authMiddleware.verifyToken, 
    authMiddleware.isAdmin, 
    capitulosController.deleteCapitulo
);

module.exports = router;
