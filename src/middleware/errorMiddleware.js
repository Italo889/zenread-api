const errorMiddleware = (err, req, res, next) => {
    console.error(err);
    const status = err.status || 500;
    const message = err.message || 'Ocorreu um erro no servidor.';
    res.status(status).send({ message });
};

module.exports = errorMiddleware;
