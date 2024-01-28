const pool = require('../config/db');

const getAvaliacoesByManga = async (mangaId) => {
    const result = await pool.query('SELECT * FROM avaliacoes WHERE manga_id = $1', [mangaId]);
    return result.rows;
};

const addAvaliacao = async (manga_id, usuario_id, avaliacao) => {
    const result = await pool.query(
        'INSERT INTO avaliacoes (manga_id, usuario_id, avaliacao) VALUES ($1, $2, $3) RETURNING *',
        [manga_id, usuario_id, avaliacao]
    );
    return result.rows[0];
};

const updateAvaliacao = async (id, avaliacao) => {
    const result = await pool.query(
        'UPDATE avaliacoes SET avaliacao = $1 WHERE id = $2 RETURNING *',
        [avaliacao, id]
    );
    return result.rows[0];
};

module.exports = {
    getAvaliacoesByManga,
    addAvaliacao,
    updateAvaliacao
};
