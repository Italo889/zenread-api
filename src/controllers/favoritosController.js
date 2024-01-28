const favoritosModel = require('../models/favoritosModel');

const getFavoritosByUsuario = async (req, res) => {
    try {
        const favoritos = await favoritosModel.getFavoritosByUsuario(req.user.id);
        res.json(favoritos);
    } catch (error) {
        res.status(500).send({ message: "Erro ao buscar favoritos." });
    }
};

const addFavorito = async (req, res) => {
    try {
        const favorito = await favoritosModel.addFavorito(req.body.manga_id, req.user.id);
        res.status(201).json(favorito);
    } catch (error) {
        res.status(500).send({ message: "Erro ao adicionar favorito." });
    }
};

const deleteFavorito = async (req, res) => {
    try {
        const favorito = await favoritosModel.deleteFavorito(req.params.id);
        res.json(favorito);
    } catch (error) {
        res.status(500).send({ message: "Erro ao deletar favorito." });
    }
};

module.exports = {
    getFavoritosByUsuario,
    addFavorito,
    deleteFavorito
};
