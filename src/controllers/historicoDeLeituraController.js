const historicoDeLeituraModel = require('../models/historicoDeLeituraModel');

const getHistoricoByUsuario = async (req, res) => {
    try {
        const historico = await historicoDeLeituraModel.getHistoricoByUsuario(req.user.id);
        res.json(historico);
    } catch (error) {
        res.status(500).send({ message: "Erro ao buscar histórico de leitura." });
    }
};

const addHistorico = async (req, res) => {
    try {
        const historico = await historicoDeLeituraModel.addHistorico(req.body.manga_id, req.user.id, req.body.ultimo_capitulo_lido);
        res.status(201).json(historico);
    } catch (error) {
        res.status(500).send({ message: "Erro ao adicionar ao histórico de leitura." });
    }
};

const updateHistorico = async (req, res) => {
    try {
        const historico = await historicoDeLeituraModel.updateHistorico(req.params.id, req.body.ultimo_capitulo_lido);
        res.json(historico);
    } catch (error) {
        res.status(500).send({ message: "Erro ao atualizar histórico de leitura." });
    }
};

module.exports = {
    getHistoricoByUsuario,
    addHistorico,
    updateHistorico
};
