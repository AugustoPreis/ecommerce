CREATE TABLE usuarios (
  id serial NOT NULL PRIMARY KEY,
  nome varchar(50) NOT NULL,
  cpf char(11) NOT NULL,
  rua varchar(100) NOT NULL,
  numero varchar(10),
  cep char(8) NOT NULL,
  ibge_cidade char(7) NOT NULL,
  telefone varchar(20) NOT NULL,
  email varchar(100) NOT NULL,
  senha TEXT NOT NULL,
  data_nascimento date NOT NULL,
  data_cadastro timestamp NOT NULL DEFAULT current_timestamp,
  data_alteracao timestamp,
  ativo bool NOT NULL DEFAULT TRUE
);