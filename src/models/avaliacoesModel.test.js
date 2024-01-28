const avaliacoesModel = require('./avaliacoesModel');
const pool = require('../config/db');

jest.mock('../config/db', () => ({
    query: jest.fn()
}));

describe('avaliacoesModel', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('getAvaliacoesByManga', () => {
        it('deve retornar avaliações de um manga específico', async () => {
            const mockAvaliacoes = [{ id: 1, avaliacao: 5 }, { id: 2, avaliacao: 4 }];
            pool.query.mockResolvedValueOnce({ rows: mockAvaliacoes });

            const avaliacoes = await avaliacoesModel.getAvaliacoesByManga(1); 
            expect(avaliacoes).toEqual(mockAvaliacoes);
            expect(pool.query).toHaveBeenCalledWith('SELECT * FROM avaliacoes WHERE manga_id = $1', [1]);
        });
    });

    describe('addAvaliacao', () => {
        it('deve adicionar uma avaliação e retornar a avaliação adicionada', async () => {
            const mockAvaliacao = { id: 1, avaliacao: 5 };
            pool.query.mockResolvedValueOnce({ rows: [mockAvaliacao] });

            const avaliacao = await avaliacoesModel.addAvaliacao(1, 1, 5);
            expect(avaliacao).toEqual(mockAvaliacao);
            expect(pool.query).toHaveBeenCalledWith('INSERT INTO avaliacoes (manga_id, usuario_id, avaliacao) VALUES ($1, $2, $3) RETURNING *', [1, 1, 5]);
        });
    });

    describe('updateAvaliacao', () => {
        it('deve atualizar uma avaliação e retornar a avaliação atualizada', async () => {
            const mockAvaliacao = { id: 1, avaliacao: 5 };
            pool.query.mockResolvedValueOnce({ rows: [mockAvaliacao] });

            const avaliacao = await avaliacoesModel.updateAvaliacao(1, 5);
            expect(avaliacao).toEqual(mockAvaliacao);
            expect(pool.query).toHaveBeenCalledWith('UPDATE avaliacoes SET avaliacao = $1 WHERE id = $2 RETURNING *', [5, 1]);
        });
    });
});
