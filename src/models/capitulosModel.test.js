const capitulosModel = require('./capitulosModel');
const pool = require('../config/db');

jest.mock('../config/db', () => ({
    query: jest.fn()
}));

describe('capitulosModel', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('getCapitulosByManga', () => {
        it('deve retornar capítulos de um manga específico', async () => {
            const mockCapitulos = [{ id: 1, titulo: 'Capítulo 1' }, { id: 2, titulo: 'Capítulo 2' }];
            pool.query.mockResolvedValueOnce({ rows: mockCapitulos });

            const capitulos = await capitulosModel.getCapitulosByManga(1);
            expect(capitulos).toEqual(mockCapitulos);
            expect(pool.query).toHaveBeenCalledWith('SELECT * FROM capitulos WHERE manga_id = $1 ORDER BY numero', [1]);
        });
    });

    describe('addCapitulo', () => {
        it('deve adicionar um capítulo e retornar o capítulo adicionado', async () => {
            const mockCapitulo = { id: 1, titulo: 'Capítulo 1' };
            pool.query.mockResolvedValueOnce({ rows: [mockCapitulo] });

            const capitulo = await capitulosModel.addCapitulo(1, 1, 'Capítulo 1', 'url', 'data_publicacao');
            expect(capitulo).toEqual(mockCapitulo);
            expect(pool.query).toHaveBeenCalledWith('INSERT INTO capitulos (manga_id, numero, titulo, url, data_publicacao) VALUES ($1, $2, $3, $4, $5) RETURNING *', [1, 1, 'Capítulo 1', 'url', 'data_publicacao']);
        });
    });

    describe('updateCapitulo', () => {
        it('deve atualizar um capítulo e retornar o capítulo atualizado', async () => {
            const mockCapitulo = { id: 1, titulo: 'Capítulo 1 Atualizado' };
            pool.query.mockResolvedValueOnce({ rows: [mockCapitulo] });

            const capitulo = await capitulosModel.updateCapitulo(1, 1, 'Capítulo 1 Atualizado', 'url', 'data_publicacao');
            expect(capitulo).toEqual(mockCapitulo);
            expect(pool.query).toHaveBeenCalledWith('UPDATE capitulos SET numero = $1, titulo = $2, url = $3, data_publicacao = $4 WHERE id = $5 RETURNING *', [1, 'Capítulo 1 Atualizado', 'url', 'data_publicacao', 1]);
        });
    });

    describe('deleteCapitulo', () => {
        it('deve deletar um capítulo e retornar o capítulo deletado', async () => {
            const mockCapitulo = { id: 1, titulo: 'Capítulo 1' };
            pool.query.mockResolvedValueOnce({ rows: [mockCapitulo] });

            const capitulo = await capitulosModel.deleteCapitulo(1);
            expect(capitulo).toEqual(mockCapitulo);
            expect(pool.query).toHaveBeenCalledWith('DELETE FROM capitulos WHERE id = $1 RETURNING *', [1]);
        });
    });
});
