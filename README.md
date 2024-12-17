# E-commerce

Este repositório contém o código fonte de um **e-commerce**. O projeto está estruturado utilizando a arquitetura de **microsserviços**, facilitando escalabilidade e manutenção.

## Tecnologias Utilizadas

- **Node.js**: Execução de código JavaScript no lado do servidor.
- **Express**: Framework web para roteamento.
- **TypeScript**: Superset do JavaScript que adiciona tipagem estática.
- **TypeORM**: ORM para trabalhar com bancos de dados relacionais.
- **Docker**: Conteinerização e execução do banco de dados.
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

### 2. Configurar o Banco de Dados

O banco de dados é iniciado via **docker**, então certifique-se de ter o docker instalado e configurado na sua máquina
- Na pasta raiz do projeto (`ecommerce`), rode o seguinte comando

```bash
docker compose up --build
```

### 3. Configurar Variáveis de Ambiente

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

#Chave secreta JWT, recomendado gerar uma aleatória
JWT_SECRET=

#Validade do JWT, segue o padrão vercel/ms
JWT_EXPIRES_IN=
```

### 4. Instalar Dependências

```bash
npm install
# ou yarn install
```

### 5. Executar o Servidor

```bash
npm start
# ou yarn start
```

O servidor irá rodar no `localhost`, na porta informada dentro do arquivo `.env`

---

## Scripts Disponíveis

- Os scripts podem variar conforme necessidade, consulta o `package.json` de cada microsserviço para mais informações
- No `package.json`:

| Script         | Descrição                                                      |
|----------------|----------------------------------------------------------------|
| `start`        | Inicia o servidor em modo de desenvolvimento                   |
| `build`        | Compila o projeto para produção                                |

## Commits

Todos os commits são realizados seguindo este padrão:

```bash
#Exemplo
git commit -m "[docs] :books: adiciona documentação"
```

### Prefixo

<table>
  <thead>
    <tr>
      <th>Tipo</th>
      <th>Emoji</th>
      <th>Descrição</th>
    </tr>
  </thead>
 <tbody>
    <tr>
      <td>feat</td>
      <td>:sparkles:</td>
      <td>Inclusão de novos recursos</td>
    </tr>
    <tr>
      <td>fix</td>
      <td>:bug:</td>
      <td>Correção de bugs</td>
    </tr>
    <tr>
      <td>docs</td>
      <td>:books:</td>
      <td>Mudanças na documentação</td>
    </tr>
    <tr>
      <td>test</td>
      <td>:test_tube:</td>
      <td>Criação/Alteração de testes</td>
    </tr>
    <tr>
      <td>build</td>
      <td>:package:</td>
      <td>Criação/Alteração em arquivos de build/dependências</td>
    </tr>
    <tr>
      <td>perf</td>
      <td>:zap:</td>
      <td>Alterações relacionadas a performance</td>
    </tr>
    <tr>
      <td>style</td>
      <td>:ok_hand:</td>
      <td>Formatações de código, lint</td>
    </tr>
    <tr>
      <td>refactor</td>
      <td>:recycle:</td>
      <td>Refatorações que não alterem funcionalidades</td>
    </tr>
    <tr>
      <td>chore</td>
      <td>:truck:</td>
      <td>Atualizações de build, gitignore</td>
    </tr>
    <tr>
      <td>raw</td>
      <td>:card_file_box:</td>
      <td>Arquivos de configurações, dados, features, parâmetros</td>
    </tr>
    <tr>
      <td>cleanup</td>
      <td>:broom:</td>
      <td>Limpeza do código-fonte</td>
    </tr>
    <tr>
      <td>remove</td>
      <td>:wastebasket:</td>
      <td>Exclusão de arquivos, diretórios ou funcionalidades</td>
    </tr>
  </tbody>
</table> 
