const pool = require('../config/db');

const getGeneros = async () => {
    const result = await pool.query('SELECT * FROM generos');
    return result.rows;
};

const getGeneroById = async (id) => {
    const result = await pool.query('SELECT * FROM generos WHERE id = $1', [id]);
    return result.rows[0];
};

const addGenero = async (nome) => {
    const result = await pool.query(
        'INSERT INTO generos (nome) VALUES ($1) RETURNING *',
        [nome]
    );
    return result.rows[0];
};

const updateGenero = async (id, nome) => {
    const result = await pool.query(
        'UPDATE generos SET nome = $1 WHERE id = $2 RETURNING *',
        [nome, id]
    );
    return result.rows[0];
};

const deleteGenero = async (id) => {
    const result = await pool.query('DELETE FROM generos WHERE id = $1 RETURNING *', [id]);
    return result.rows[0];
};

module.exports = {
    getGeneros,
    getGeneroById,
    addGenero,
    updateGenero,
    deleteGenero
};
