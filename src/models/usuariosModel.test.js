const usuariosModel = require('./usuariosModel');
const pool = require('../config/db');

jest.mock('../config/db', () => ({
    query: jest.fn()
}));

describe('usuariosModel', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('getUsuarios', () => {
        it('deve retornar uma lista de usuários', async () => {
            const mockUsuarios = [{ id: 1, nome: 'Usuário 1' }, { id: 2, nome: 'Usuário 2' }];
            pool.query.mockResolvedValueOnce({ rows: mockUsuarios });

            const usuarios = await usuariosModel.getUsuarios();
            expect(usuarios).toEqual(mockUsuarios);
            expect(pool.query).toHaveBeenCalledWith('SELECT * FROM usuarios');
        });
    });

    describe('addUsuario', () => {
        it('deve adicionar um usuário e retornar o usuário adicionado', async () => {
            const mockUsuario = { id: 1, nome: 'Usuário 1' };
            pool.query.mockResolvedValueOnce({ rows: [mockUsuario] });

            const usuario = await usuariosModel.addUsuario('Usuário 1', 'email@example.com', 'senhaHash');
            expect(usuario).toEqual(mockUsuario);
            expect(pool.query).toHaveBeenCalledWith('INSERT INTO usuarios (nome, email, senha_hash) VALUES ($1, $2, $3) RETURNING *', ['Usuário 1', 'email@example.com', 'senhaHash']);
        });
    });

    describe('updateUsuario', () => {
        it('deve atualizar um usuário e retornar o usuário atualizado', async () => {
            const mockUsuario = { id: 1, nome: 'Usuário 1 Atualizado' };
            pool.query.mockResolvedValueOnce({ rows: [mockUsuario] });

            const usuario = await usuariosModel.updateUsuario(1, 'Usuário 1 Atualizado', 'email@example.com', 'senhaHash');
            expect(usuario).toEqual(mockUsuario);
            expect(pool.query).toHaveBeenCalledWith('UPDATE usuarios SET nome = $1, email = $2, senha_hash = $3 WHERE id = $4 RETURNING *', ['Usuário 1 Atualizado', 'email@example.com', 'senhaHash', 1]);
        });
    });

    describe('deleteUsuario', () => {
        it('deve deletar um usuário e retornar o usuário deletado', async () => {
            const mockUsuario = { id: 1, nome: 'Usuário 1' };
            pool.query.mockResolvedValueOnce({ rows: [mockUsuario] });

            const usuario = await usuariosModel.deleteUsuario(1);
            expect(usuario).toEqual(mockUsuario);
            expect(pool.query).toHaveBeenCalledWith('DELETE FROM usuarios WHERE id = $1 RETURNING *', [1]);
        });
    });
});
