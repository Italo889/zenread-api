const pool = require('../config/db');
const { validationResult, body } = require('express-validator');

const handleError = (error, res) => {
    console.error(error.message);
    console.error(error.stack)
    res.status(500).send({ message: "Ocorreu um erro interno no servidor." });
};

const validateManga = [
    body('titulo').notEmpty().trim().withMessage('O título é obrigatório.'),
    body('descricao').notEmpty().trim().withMessage('A descrição é obrigatória.'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    },
];

const getMangas = async (req, res) => {
    try {
        const allMangas = await pool.query('SELECT * FROM mangas');
        res.json(allMangas.rows);
    } catch (error) {
        handleError(error, res);
    }
};

const getMangaById = async (req, res) => {
    try {
        const { id } = req.params;
        const manga = await pool.query('SELECT * FROM mangas WHERE id = $1', [id]);
        res.json(manga.rows[0]);
    } catch (error) {
        handleError(error, res);
    }
};

const addManga = async (req, res) => {
    try {
        const { titulo, descricao, autor_id, data_publicacao, status, capa_url } = req.body;
        const newManga = await pool.query(
            'INSERT INTO mangas (titulo, descricao, autor_id, data_publicacao, status, capa_url) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
            [titulo, descricao, autor_id, data_publicacao, status, capa_url]
        );
        res.json(newManga.rows[0]);
    } catch (error) {
        handleError(error, res);
    }
};

const updateManga = async (req, res) => {
    try {
        const { id } = req.params;
        const { titulo, descricao, autor_id, data_publicacao, status, capa_url } = req.body;
        const updateManga = await pool.query(
            'UPDATE mangas SET titulo = $1, descricao = $2, autor_id = $3, data_publicacao = $4, status = $5, capa_url = $6 WHERE id = $7 RETURNING *',
            [titulo, descricao, autor_id, data_publicacao, status, capa_url, id]
        );
        res.json(updateManga.rows[0]);
    } catch (error) {
        handleError(error, res);
    }
};

const deleteManga = async (req, res) => {
    try {
        const { id } = req.params;
        const deleteManga = await pool.query('DELETE FROM mangas WHERE id = $1 RETURNING *', [id]);
        res.json(deleteManga.rows[0]);
    } catch (error) {
        handleError(error, res);
    }
};

module.exports = {
    getMangas,
    getMangaById,
    addManga,
    updateManga,
    deleteManga,
    validateManga
};
