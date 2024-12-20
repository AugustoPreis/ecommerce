# E-commerce

Este repositório contém o código fonte de um **e-commerce**. O projeto está estruturado utilizando a arquitetura de **microsserviços**, facilitando escalabilidade e manutenção.

## Tecnologias Utilizadas

- **Node.js**: Execução de código JavaScript no lado do servidor.
- **Express**: Framework web para roteamento.
- **TypeScript**: Superset do JavaScript que adiciona tipagem estática.
- **TypeORM**: ORM para trabalhar com bancos de dados relacionais.
- **Docker**: Conteinerização e execução do projeto.
- **PostgreSQL**: Banco de dados utilizado.

---

## Estrutura de Pastas

O projeto possui uma pasta chamada `services`, dentro dela estão localizados todos os microsserviços da aplicação.

Abaixo está a organização do código dentro do diretório `/services/exemplo`:

```plaintext
services/exemplo/
|-- src/                # Código fonte do microsserviço
|   |-- apis/           # Integrações com APIs externas
|   |-- config/         # Configurações do projeto, como banco de dados
|   |-- controllers/    # Controladores das rotas
|   |-- dtos/           # Data Transfer Objects (validações e tipagens)
|   |-- middlewares/    # Middlewares (autenticação, handlers de erros)
|   |-- models/         # Entidades do banco de dados (TypeORM)
|   |-- repositories/   # Camada de acesso ao banco de dados
|   |-- routes/         # Definição das rotas da API
|   |-- services/       # Regras de negócio do microsserviço
|   |-- types/          # Tipos e interfaces TypeScript reutilizáveis
|   |-- utils/          # Funções utilitárias (formatadores, validadores)
|   |-- app.ts          # Arquivo de inicialização do serviço
|-- .env.example        # Modelo de arquivo .env
|-- package.json        # Dependências e scripts do projeto
|-- tsconfig.json       # Configuração do TypeScript
```

---

## Instalação e Configuração

### 1. Clonar o Repositório

```bash
git clone https://github.com/AugustoPreis/ecommerce.git
cd ecommerce
```

### 2. Configurar Variáveis de Ambiente

- Dentro de cada serviço, crie um arquivo `.env` com base no `.env.example`:
- O arquivo abaixo possui a configuração de TODOS os valores .env encontrados no projeto
- Certifique-se de utilizar somente os necessários (encontrados no .env.example de cada microsserviço)

```env
#Prencha os valores abaixo conforme o .env.example do microsserviço desejado
#Evite alterar valores pré-preenchidos

#Porta do servidor
#Altere este valor apenas se necessário, o microsserviço foi criado e testado utilizando esta porta
PORT=

#Conexão com o banco de dados
#Os dados informados aqui condizem com o arquivo docker-compose.yml
#A alteração desses valores pode gerar erros na conexão
DB_HOST=
DB_USER=
DB_PASS=
DB_NAME=
DB_PORT=

#Comunicação interna entra os serviços
MS_USUARIOS_URL=
MS_PRODUTOS_URL=
MS_CARRINHOS_URL=

#Chave secreta JWT, recomendado gerar uma aleatória
JWT_SECRET=

#Validade do JWT, segue o padrão vercel/ms
JWT_EXPIRES_IN=
```

### 3. Iniciar o projeto

O projeto pode ser iniciado via **docker**, então certifique-se de ter o docker instalado e configurado na sua máquina
- Na pasta raiz do projeto (`ecommerce`), rode o seguinte comando

```bash
docker compose up --build
```

O servidor irá rodar no `localhost`, na porta informada dentro do arquivo `.env` de cada serviço

---

## Scripts Disponíveis

- Os scripts podem variar conforme necessidade, consulte o `package.json` de cada microsserviço para mais informações
- No `package.json`:

| Script         | Descrição                                                      |
|----------------|----------------------------------------------------------------|
| `start`        | Inicia o servidor em modo de desenvolvimento                   |
| `build`        | Compila o projeto para produção                                |

## Commits

- Todos os commits devem ser realizados utilizando **git-cz**
- A configuração do **git-cz** se encontra no arquivo `changelog.config.js`