const comentariosModel = require('../models/comentariosModel');

const getComentariosByManga = async (req, res) => {
    try {
        const comentarios = await comentariosModel.getComentariosByManga(req.params.manga_id);
        res.json(comentarios);
    } catch (error) {
        res.status(500).send({ message: "Erro ao buscar comentários." });
    }
};

const addComentario = async (req, res) => {
    try {
        const comentario = await comentariosModel.addComentario(req.body.manga_id, req.user.id, req.body.comentario);
        res.status(201).json(comentario);
    } catch (error) {
        res.status(500).send({ message: "Erro ao adicionar comentário." });
    }
};

const deleteComentario = async (req, res) => {
    try {
        const comentario = await comentariosModel.deleteComentario(req.params.id);
        res.json(comentario);
    } catch (error) {
        res.status(500).send({ message: "Erro ao deletar comentário." });
    }
};

module.exports = {
    getComentariosByManga,
    addComentario,
    deleteComentario
};
