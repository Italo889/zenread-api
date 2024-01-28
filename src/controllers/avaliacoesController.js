const avaliacoesModel = require('../models/avaliacoesModel');

const getAvaliacoesByManga = async (req, res) => {
    try {
        const avaliacoes = await avaliacoesModel.getAvaliacoesByManga(req.params.manga_id);
        res.json(avaliacoes);
    } catch (error) {
        res.status(500).send({ message: "Erro ao buscar avaliações." });
    }
};

const addAvaliacao = async (req, res) => {
    try {
        const avaliacao = await avaliacoesModel.addAvaliacao(req.body.manga_id, req.user.id, req.body.avaliacao);
        res.status(201).json(avaliacao);
    } catch (error) {
        res.status(500).send({ message: "Erro ao adicionar avaliação." });
    }
};

const updateAvaliacao = async (req, res) => {
    try {
        const avaliacao = await avaliacoesModel.updateAvaliacao(req.params.id, req.body.avaliacao);
        res.json(avaliacao);
    } catch (error) {
        res.status(500).send({ message: "Erro ao atualizar avaliação." });
    }
};

module.exports = {
    getAvaliacoesByManga,
    addAvaliacao,
    updateAvaliacao
};
