const pool = require('../config/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { validationResult, body } = require('express-validator');

const handleError = (error, res) => {
    console.error(error.message);
    res.status(500).send({ message: "Ocorreu um erro interno no servidor." });
};

const validateUser = [
    body('nome').notEmpty().trim().withMessage('O nome é obrigatório.'),
    body('email').isEmail().withMessage('Forneça um endereço de email válido.'),
    body('senha').isLength({ min: 6 }).withMessage('A senha deve ter pelo menos 6 caracteres.'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    },
];

const registerUser = async (req, res) => {
    try {
        const { nome, email, senha } = req.body;
        const user = await pool.query('SELECT * FROM usuarios WHERE email = $1', [email]);
        if (user.rows.length > 0) {
            return res.status(401).send("Usuário já existe.");
        }
        const salt = await bcrypt.genSalt(10);
        const senhaHash = await bcrypt.hash(senha, salt);
        const newUser = await pool.query(
            'INSERT INTO usuarios (nome, email, senha_hash) VALUES ($1, $2, $3) RETURNING *',
            [nome, email, senhaHash]
        );
        res.json(newUser.rows[0]);
    } catch (error) {
        handleError(error, res);
    }
};

const loginUser = async (req, res) => {
    try {
        const { email, senha } = req.body;
        const user = await pool.query('SELECT * FROM usuarios WHERE email = $1', [email]);
        if (user.rows.length === 0) {
            return res.status(401).send("Credenciais inválidas.");
        }
        const validPassword = await bcrypt.compare(senha, user.rows[0].senha_hash);
        if (!validPassword) {
            return res.status(401).send("Credenciais inválidas.");
        }
        const token = jwt.sign({ id: user.rows[0].id }, process.env.JWT_SECRET, {
            expiresIn: '100h'
        });
        res.json({ token });
    } catch (error) {
        handleError(error, res);
    }
};

const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { nome, email, senha } = req.body;
        const salt = await bcrypt.genSalt(10);
        const senhaHash = await bcrypt.hash(senha, salt);
        const updateUser = await pool.query(
            'UPDATE usuarios SET nome = $1, email = $2, senha_hash = $3 WHERE id = $4 RETURNING *',
            [nome, email, senhaHash, id]
        );
        res.json(updateUser.rows[0]);
    } catch (error) {
        handleError(error, res);
    }
};

module.exports = {
    registerUser,
    loginUser,
    updateUser,
    validateUser
};
