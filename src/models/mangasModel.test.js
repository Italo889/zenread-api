const mangasModel = require('./mangasModel');
const pool = require('../config/db');

jest.mock('../config/db', () => ({
    query: jest.fn()
}));

describe('mangasModel', () => {
    describe('getMangas', () => {
        it('deve retornar uma lista de mangás', async () => {

            const mockMangas = [
                { id: 1, titulo: 'Manga 1', descricao: 'Descrição do Manga 1', autor_id: 1 },
                { id: 2, titulo: 'Manga 2', descricao: 'Descrição do Manga 2', autor_id: 2 }
            ];

            pool.query.mockResolvedValueOnce({ rows: mockMangas });

            const mangas = await mangasModel.getMangas();

            expect(mangas).toEqual(mockMangas);
            expect(pool.query).toHaveBeenCalledWith('SELECT * FROM mangas');
        });
    });

    describe('getMangaById', () => {
        it('deve retornar um manga específico pelo ID', async () => {
            const mockManga = { id: 1, titulo: 'Manga 1' };
            pool.query.mockResolvedValueOnce({ rows: [mockManga] });

            const manga = await mangasModel.getMangaById(1);
            expect(manga).toEqual(mockManga);
            expect(pool.query).toHaveBeenCalledWith('SELECT * FROM mangas WHERE id = $1', [1]);
        });
    });

    describe('addManga', () => {
        it('deve adicionar um manga e retornar o manga adicionado', async () => {
            const mockManga = { id: 1, titulo: 'Manga 1' };
            pool.query.mockResolvedValueOnce({ rows: [mockManga] });

            const manga = await mangasModel.addManga('Manga 1', 'Descrição', 1, 'data_publicacao', 'status', 'capa_url');
            expect(manga).toEqual(mockManga);
            expect(pool.query).toHaveBeenCalledWith('INSERT INTO mangas (titulo, descricao, autor_id, data_publicacao, status, capa_url) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *', ['Manga 1', 'Descrição', 1, 'data_publicacao', 'status', 'capa_url']);
        });
    });

    describe('updateManga', () => {
        it('deve atualizar um manga e retornar o manga atualizado', async () => {
            const mockManga = { id: 1, titulo: 'Manga 1 Atualizado' };
            pool.query.mockResolvedValueOnce({ rows: [mockManga] });

            const manga = await mangasModel.updateManga(1, 'Manga 1 Atualizado', 'Descrição', 1, 'data_publicacao', 'status', 'capa_url');
            expect(manga).toEqual(mockManga);
            expect(pool.query).toHaveBeenCalledWith('UPDATE mangas SET titulo = $1, descricao = $2, autor_id = $3, data_publicacao = $4, status = $5, capa_url = $6 WHERE id = $7 RETURNING *', ['Manga 1 Atualizado', 'Descrição', 1, 'data_publicacao', 'status', 'capa_url', 1]);
        });
    });

    describe('deleteManga', () => {
        it('deve deletar um manga e retornar o manga deletado', async () => {
            const mockManga = { id: 1, titulo: 'Manga 1' };
            pool.query.mockResolvedValueOnce({ rows: [mockManga] });

            const manga = await mangasModel.deleteManga(1);
            expect(manga).toEqual(mockManga);
            expect(pool.query).toHaveBeenCalledWith('DELETE FROM mangas WHERE id = $1 RETURNING *', [1]);
        });
    });

});

