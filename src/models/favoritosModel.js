const pool = require('../config/db');

const getFavoritosByUsuario = async (usuarioId) => {
    const result = await pool.query('SELECT * FROM favoritos WHERE usuario_id = $1', [usuarioId]);
    return result.rows;
};

const addFavorito = async (manga_id, usuario_id) => {
    const result = await pool.query(
        'INSERT INTO favoritos (manga_id, usuario_id) VALUES ($1, $2) RETURNING *',
        [manga_id, usuario_id]
    );
    return result.rows[0];
};

const deleteFavorito = async (id) => {
    const result = await pool.query('DELETE FROM favoritos WHERE id = $1 RETURNING *', [id]);
    return result.rows[0];
};

module.exports = {
    getFavoritosByUsuario,
    addFavorito,
    deleteFavorito
};
