# ZenRead-api

ZenRead é uma plataforma de leitura de mangás com foco em proporcionar uma experiência de leitura confortável e envolvente. Este repositório abrange o back-end do projeto, implementado com Node.js e Express.

## Funcionalidades do Back-end

- **Autenticação de Usuários:** Registro e login de usuários com hashing de senha e geração de tokens JWT.
- **Gerenciamento de Mangás:** CRUD para mangás, incluindo título, descrição, autor, e status de publicação.
- **Gerenciamento de Capítulos:** Adição, atualização e remoção de capítulos dos mangás.
- **Controle de Acesso:** Restrições de acesso baseadas em roles de usuário (admin e regular).

## Tecnologias Utilizadas

- **Node.js e Express:** Para a criação do servidor e gerenciamento de rotas.
- **PostgreSQL:** Banco de dados SQL para armazenamento de dados.
- **bcrypt:** Para hashing de senhas de usuários.
- **JSON Web Tokens (JWT):** Para autenticação e manutenção de sessões de usuários.
- **Jest:** Para testes unitários.

## Configuração e Instalação

Clone o repositório e instale as dependências:

```bash
git clone https://github.com/seuusuario/zenread-api.git
cd zenread-api
npm install
```

## Como Usar

Configure o arquivo .env com as credenciais do seu banco de dados PostgreSQL e outras variáveis de ambiente necessárias. Em seguida, inicie o servidor:

```bash
npm start
```