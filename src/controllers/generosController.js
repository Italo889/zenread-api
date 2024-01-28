const generosModel = require('../models/generosModel');

const getGeneros = async (req, res) => {
    try {
        const generos = await generosModel.getGeneros();
        res.json(generos);
    } catch (error) {
        res.status(500).send({ message: "Erro ao buscar gêneros." });
    }
};

const getGeneroById = async (req, res) => {
    try {
        const genero = await generosModel.getGeneroById(req.params.id);
        res.json(genero);
    } catch (error) {
        res.status(500).send({ message: "Erro ao buscar gênero." });
    }
};

const addGenero = async (req, res) => {
    try {
        const genero = await generosModel.addGenero(req.body.nome);
        res.status(201).json(genero);
    } catch (error) {
        res.status(500).send({ message: "Erro ao adicionar gênero." });
    }
};

const updateGenero = async (req, res) => {
    try {
        const genero = await generosModel.updateGenero(req.params.id, req.body.nome);
        res.json(genero);
    } catch (error) {
        res.status(500).send({ message: "Erro ao atualizar gênero." });
    }
};

const deleteGenero = async (req, res) => {
    try {
        const genero = await generosModel.deleteGenero(req.params.id);
        res.json(genero);
    } catch (error) {
        res.status(500).send({ message: "Erro ao deletar gênero." });
    }
};

module.exports = {
    getGeneros,
    getGeneroById,
    addGenero,
    updateGenero,
    deleteGenero
};
