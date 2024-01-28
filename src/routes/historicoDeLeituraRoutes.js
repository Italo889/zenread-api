const express = require('express');
const router = express.Router();
const historicoDeLeituraController = require('../controllers/historicoDeLeituraController');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/', authMiddleware.verifyToken, historicoDeLeituraController.getHistoricoByUsuario);
router.post('/', authMiddleware.verifyToken, historicoDeLeituraController.addHistorico);
router.put('/:id', authMiddleware.verifyToken, historicoDeLeituraController.updateHistorico);

module.exports = router;
