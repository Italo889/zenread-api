const pool = require('../config/db');
const { body, validationResult } = require('express-validator');

const handleError = (error, res) => {
    console.error(error.message);
    res.status(500).send({ message: "Ocorreu um erro interno no servidor." });
};

const validateCapitulo = [
    body('manga_id').notEmpty().withMessage('O ID do mangá é obrigatório.'),
    body('numero').notEmpty().withMessage('O número do capítulo é obrigatório.'),
    body('titulo').notEmpty().withMessage('O título do capítulo é obrigatório.'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    },
];

const getCapitulosByManga = async (req, res) => {
    try {
        const { manga_id } = req.params;
        const capitulos = await pool.query('SELECT * FROM capitulos WHERE manga_id = $1 ORDER BY numero', [manga_id]);
        res.json(capitulos.rows);
    } catch (error) {
        handleError(error, res);
    }
};

const addCapitulo = async (req, res) => {
    try {
        const { manga_id, numero, titulo, url, data_publicacao } = req.body;
        const newCapitulo = await pool.query(
            'INSERT INTO capitulos (manga_id, numero, titulo, url, data_publicacao) VALUES ($1, $2, $3, $4, $5) RETURNING *',
            [manga_id, numero, titulo, url, data_publicacao]
        );
        res.json(newCapitulo.rows[0]);
    } catch (error) {
        handleError(error, res);
    }
};

const updateCapitulo = async (req, res) => {
    try {
        const { id } = req.params;
        const { numero, titulo, url, data_publicacao } = req.body;
        const updatedCapitulo = await pool.query(
            'UPDATE capitulos SET numero = $1, titulo = $2, url = $3, data_publicacao = $4 WHERE id = $5 RETURNING *',
            [numero, titulo, url, data_publicacao, id]
        );
        res.json(updatedCapitulo.rows[0]);
    } catch (error) {
        handleError(error, res);
    }
};

const deleteCapitulo = async (req, res) => {
    try {
        const { id } = req.params;
        const deleteCapitulo = await pool.query('DELETE FROM capitulos WHERE id = $1 RETURNING *', [id]);
        res.json(deleteCapitulo.rows[0]);
    } catch (error) {
        handleError(error, res);
    }
};

module.exports = {
    getCapitulosByManga,
    addCapitulo,
    updateCapitulo,
    deleteCapitulo,
    validateCapitulo
};
