const express = require('express');
const router = express.Router();
const usuariosController = require('../controllers/usuariosController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/register', usuariosController.registerUser);
router.post('/login', usuariosController.loginUser);
router.put('/update', authMiddleware.verifyToken, usuariosController.updateUser);

module.exports = router;
