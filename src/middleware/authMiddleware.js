const jwt = require('jsonwebtoken');
const pool = require('../config/db');

const handleError = (error, res) => {
    console.error(error.message);
    res.status(500).send({ message: "Ocorreu um erro interno no servidor." });
};

const verifyToken = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];

    if (!token) {
        return res.status(403).send({ message: "Um token é necessário para autenticação" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
    } catch (err) {
        return res.status(401).send({ message: "Token inválido" });
    }

    return next();
};

const isAdmin = async (req, res, next) => {
    try {
        const user = await pool.query('SELECT is_admin FROM usuarios WHERE id = $1', [req.user.id]);
        if (user.rows.length > 0 && user.rows[0].is_admin) {
            return next();
        } else {
            return res.status(403).send({ message: "Acesso negado. Apenas admins podem realizar essa operação." });
        }
    } catch (error) {
        handleError(error, res);
    }
};

module.exports = {
    verifyToken,
    isAdmin
};
