const pool = require('../config/db');

const getMangas = async () => {
    const allMangas = await pool.query('SELECT * FROM mangas');
    return allMangas.rows;
};

const getMangaById = async (id) => {
    const manga = await pool.query('SELECT * FROM mangas WHERE id = $1', [id]);
    return manga.rows[0];
};

const addManga = async (titulo, descricao, autor_id, data_publicacao, status, capa_url) => {
    const newManga = await pool.query(
        'INSERT INTO mangas (titulo, descricao, autor_id, data_publicacao, status, capa_url) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
        [titulo, descricao, autor_id, data_publicacao, status, capa_url]
    );
    return newManga.rows[0];
};

const updateManga = async (id, titulo, descricao, autor_id, data_publicacao, status, capa_url) => {
    const updatedManga = await pool.query(
        'UPDATE mangas SET titulo = $1, descricao = $2, autor_id = $3, data_publicacao = $4, status = $5, capa_url = $6 WHERE id = $7 RETURNING *',
        [titulo, descricao, autor_id, data_publicacao, status, capa_url, id]
    );
    return updatedManga.rows[0];
};

const deleteManga = async (id) => {
    const deleteManga = await pool.query('DELETE FROM mangas WHERE id = $1 RETURNING *', [id]);
    return deleteManga.rows[0];
};

module.exports = {
    getMangas,
    getMangaById,
    addManga,
    updateManga,
    deleteManga
};
