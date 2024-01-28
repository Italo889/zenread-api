require('dotenv').config();

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const mangasRoutes = require('./src/routes/mangasRoutes');
const usuariosRoutes = require('./src/routes/usuariosRoutes');
const capitulosRoutes = require('./src/routes/capitulosRoutes');
const comentariosRoutes = require('./src/routes/comentariosRoutes');
const avaliacoesRoutes = require('./src/routes/avaliacoesRoutes');
const favoritosRoutes = require('./src/routes/favoritosRoutes');
const historicoDeLeituraRoutes = require('./src/routes/historicoDeLeituraRoutes');
const errorMiddleware = require('./src/middleware/errorMiddleware');

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan('tiny'));

app.use('/api/mangas', mangasRoutes);
app.use('/api/usuarios', usuariosRoutes);
app.use('/api/capitulos', capitulosRoutes);
app.use('/api/comentarios', comentariosRoutes);
app.use('/api/avaliacoes', avaliacoesRoutes);
app.use('/api/favoritos', favoritosRoutes);
app.use('/api/historico', historicoDeLeituraRoutes);
app.use((req, res, next) => {
    res.status(404).send({ message: 'Rota não encontrada' });
});

app.use(errorMiddleware);

app.get('/', (req, res) => {
    res.send('Server is running');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
