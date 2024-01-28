const pool = require('../config/db');

const getCapitulosByManga = async (mangaId) => {
    const result = await pool.query('SELECT * FROM capitulos WHERE manga_id = $1 ORDER BY numero', [mangaId]);
    return result.rows;
};

const addCapitulo = async (manga_id, numero, titulo, url, data_publicacao) => {
    const result = await pool.query(
        'INSERT INTO capitulos (manga_id, numero, titulo, url, data_publicacao) VALUES ($1, $2, $3, $4, $5) RETURNING *',
        [manga_id, numero, titulo, url, data_publicacao]
    );
    return result.rows[0];
};

const updateCapitulo = async (id, numero, titulo, url, data_publicacao) => {
    const result = await pool.query(
        'UPDATE capitulos SET numero = $1, titulo = $2, url = $3, data_publicacao = $4 WHERE id = $5 RETURNING *',
        [numero, titulo, url, data_publicacao, id]
    );
    return result.rows[0];
};

const deleteCapitulo = async (id) => {
    const result = await pool.query('DELETE FROM capitulos WHERE id = $1 RETURNING *', [id]);
    return result.rows[0];
};

module.exports = {
    getCapitulosByManga,
    addCapitulo,
    updateCapitulo,
    deleteCapitulo
};
