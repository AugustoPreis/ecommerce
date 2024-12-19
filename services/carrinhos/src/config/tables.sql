CREATE TABLE carrinhos (
  id serial NOT NULL PRIMARY KEY,
  usuario_id int NOT NULL,
  data_cadastro timestamp NOT NULL DEFAULT current_timestamp,
  data_alteracao timestamp,
  ativo bool NOT NULL DEFAULT TRUE
);

CREATE TABLE carrinho_itens (
  id serial NOT NULL PRIMARY KEY,
  carrinho_id int NOT NULL REFERENCES carrinhos,
  produto_id int NOT NULL,
  quantidade int NOT NULL,
  data_cadastro timestamp NOT NULL DEFAULT current_timestamp,
  data_alteracao timestamp,
  ativo bool NOT NULL DEFAULT TRUE
);