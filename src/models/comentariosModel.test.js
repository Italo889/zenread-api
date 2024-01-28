const comentariosModel = require('./comentariosModel');
const pool = require('../config/db');

jest.mock('../config/db', () => ({
    query: jest.fn()
}));

describe('comentariosModel', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('getComentariosByManga', () => {
        it('deve retornar comentários de um manga específico', async () => {
            const mockComentarios = [{ id: 1, comentario: 'Comentário 1' }, { id: 2, comentario: 'Comentário 2' }];
            pool.query.mockResolvedValueOnce({ rows: mockComentarios });

            const comentarios = await comentariosModel.getComentariosByManga(1);
            expect(comentarios).toEqual(mockComentarios);
            expect(pool.query).toHaveBeenCalledWith('SELECT * FROM comentarios WHERE manga_id = $1 ORDER BY data_publicacao DESC', [1]);
        });
    });

    describe('addComentario', () => {
        it('deve adicionar um comentário e retornar o comentário adicionado', async () => {
            const mockComentario = { id: 1, comentario: 'Comentário 1' };
            pool.query.mockResolvedValueOnce({ rows: [mockComentario] });

            const comentario = await comentariosModel.addComentario(1, 1, 'Comentário 1'); 
            expect(comentario).toEqual(mockComentario);
            expect(pool.query).toHaveBeenCalledWith('INSERT INTO comentarios (manga_id, usuario_id, comentario) VALUES ($1, $2, $3) RETURNING *', [1, 1, 'Comentário 1']);
        });
    });

    describe('deleteComentario', () => {
        it('deve deletar um comentário e retornar o comentário deletado', async () => {
            const mockComentario = { id: 1, comentario: 'Comentário 1' };
            pool.query.mockResolvedValueOnce({ rows: [mockComentario] });

            const comentario = await comentariosModel.deleteComentario(1);
            expect(comentario).toEqual(mockComentario);
            expect(pool.query).toHaveBeenCalledWith('DELETE FROM comentarios WHERE id = $1 RETURNING *', [1]);
        });
    });
});
