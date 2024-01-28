const pool = require('../config/db');

const getComentariosByManga = async (mangaId) => {
    const result = await pool.query('SELECT * FROM comentarios WHERE manga_id = $1 ORDER BY data_publicacao DESC', [mangaId]);
    return result.rows;
};

const addComentario = async (manga_id, usuario_id, comentario) => {
    const result = await pool.query(
        'INSERT INTO comentarios (manga_id, usuario_id, comentario) VALUES ($1, $2, $3) RETURNING *',
        [manga_id, usuario_id, comentario]
    );
    return result.rows[0];
};

const deleteComentario = async (id) => {
    const result = await pool.query('DELETE FROM comentarios WHERE id = $1 RETURNING *', [id]);
    return result.rows[0];
};

module.exports = {
    getComentariosByManga,
    addComentario,
    deleteComentario
};
