const pool = require('../config/db');

const getHistoricoByUsuario = async (usuarioId) => {
    const result = await pool.query('SELECT * FROM historico_de_leitura WHERE usuario_id = $1 ORDER BY data_leitura DESC', [usuarioId]);
    return result.rows;
};

const addHistorico = async (manga_id, usuario_id, ultimo_capitulo_lido) => {
    const result = await pool.query(
        'INSERT INTO historico_de_leitura (manga_id, usuario_id, ultimo_capitulo_lido) VALUES ($1, $2, $3) RETURNING *',
        [manga_id, usuario_id, ultimo_capitulo_lido]
    );
    return result.rows[0];
};

const updateHistorico = async (id, ultimo_capitulo_lido) => {
    const result = await pool.query(
        'UPDATE historico_de_leitura SET ultimo_capitulo_lido = $1 WHERE id = $2 RETURNING *',
        [ultimo_capitulo_lido, id]
    );
    return result.rows[0];
};

module.exports = {
    getHistoricoByUsuario,
    addHistorico,
    updateHistorico
};
