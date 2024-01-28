const pool = require('../config/db');

const getUsuarios = async () => {
    const result = await pool.query('SELECT * FROM usuarios');
    return result.rows;
};

const getUsuarioById = async (id) => {
    const result = await pool.query('SELECT * FROM usuarios WHERE id = $1', [id]);
    return result.rows[0];
};

const addUsuario = async (nome, email, senhaHash) => {
    const result = await pool.query(
        'INSERT INTO usuarios (nome, email, senha_hash) VALUES ($1, $2, $3) RETURNING *',
        [nome, email, senhaHash]
    );
    return result.rows[0];
};

const updateUsuario = async (id, nome, email, senhaHash) => {
    const result = await pool.query(
        'UPDATE usuarios SET nome = $1, email = $2, senha_hash = $3 WHERE id = $4 RETURNING *',
        [nome, email, senhaHash, id]
    );
    return result.rows[0];
};

const deleteUsuario = async (id) => {
    const result = await pool.query('DELETE FROM usuarios WHERE id = $1 RETURNING *', [id]);
    return result.rows[0];
};

module.exports = {
    getUsuarios,
    getUsuarioById,
    addUsuario,
    updateUsuario,
    deleteUsuario
};
