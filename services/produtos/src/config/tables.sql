CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TABLE categorias (
  id serial NOT NULL PRIMARY KEY,
  nome varchar(50) NOT NULL,
  data_cadastro timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  data_alteracao timestamp,
  ativo bool NOT NULL DEFAULT TRUE
);

CREATE TABLE marcas (
  id serial NOT NULL PRIMARY KEY,
  nome varchar(100) NOT NULL,
  data_cadastro timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  data_alteracao timestamp,
  ativo bool NOT NULL DEFAULT TRUE
);

CREATE TABLE produtos (
  id serial NOT NULL PRIMARY KEY,
  uuid uuid NOT NULL,
  nome varchar(100) NOT NULL,
  descricao TEXT NULL,
  marca_id int NOT NULL REFERENCES marcas,
  categoria_id int NOT NULL REFERENCES categorias,
  foto bytea,
  valor numeric(9, 2),
  data_cadastro timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  data_alteracao timestamp,
  ativo bool NOT NULL DEFAULT TRUE
);

INSERT INTO categorias (nome) VALUES
  ('Informática'),
  ('Brinquedos'),
  ('Eletrodomésticos');

INSERT INTO marcas (nome) VALUES
  ('Apple'),
  ('Samsung'),
  ('Sony'),
  ('LG'),
  ('Dell'),
  ('Hasbro'),
  ('Mattel'),
  ('LEGO'),
  ('Mondial'),
  ('Brastemp');

INSERT INTO produtos ("uuid", nome, descricao, marca_id, categoria_id, foto, valor, data_cadastro, data_alteracao, ativo) VALUES
  (gen_random_uuid(), 'iPhone 15 Pro Max', 'Smartphone de última geração com tela Super Retina XDR, chip A17 Bionic e câmera de 48MP.', 1, 1, NULL, 10999.00, '2024-12-17 15:44:04.099', NULL, true),
  (gen_random_uuid(), 'MacBook Pro M3', 'Notebook com chip M3, tela Liquid Retina XDR de 14 polegadas e até 32GB de RAM.', 1, 1, NULL, 17499.00, '2024-12-17 15:44:04.099', NULL, true),
  (gen_random_uuid(), 'iPad Pro 12.9"', 'Tablet com tela Liquid Retina XDR, chip M2 e suporte ao Apple Pencil.', 1, 1, NULL, 12799.00, '2024-12-17 15:44:04.099', NULL, true),
  (gen_random_uuid(), 'Apple Watch Series 9', 'Relógio inteligente com monitoramento avançado de saúde e novo processador S9.', 1, 1, NULL, 3999.00, '2024-12-17 15:44:04.099', NULL, true),
  (gen_random_uuid(), 'AirPods Pro 2ª geração', 'Fones de ouvido sem fio com cancelamento ativo de ruído e modo transparência.', 1, 1, NULL, 2149.00, '2024-12-17 15:44:04.099', NULL, true),
  (gen_random_uuid(), 'Galaxy S23 Ultra', 'Smartphone premium com tela Dynamic AMOLED 2X de 6,8 polegadas e câmera de 200MP.', 2, 1, NULL, 10499.00, '2024-12-17 15:44:04.099', NULL, true),
  (gen_random_uuid(), 'Galaxy Book3 360', 'Notebook 2 em 1 com processador Intel Core i7 e tela touch de 15,6 polegadas.', 2, 1, NULL, 9499.00, '2024-12-17 15:44:04.099', NULL, true),
  (gen_random_uuid(), 'Galaxy Tab S9', 'Tablet com tela Super AMOLED, Snapdragon 8 Gen 2 e suporte à S Pen.', 2, 1, NULL, 8999.00, '2024-12-17 15:44:04.099', NULL, true),
  (gen_random_uuid(), 'Galaxy Watch 6', 'Relógio inteligente com monitoramento de saúde avançado e resistência à água.', 2, 1, NULL, 2499.00, '2024-12-17 15:44:04.099', NULL, true),
  (gen_random_uuid(), 'Galaxy Buds 2 Pro', 'Fones de ouvido sem fio com cancelamento de ruído ativo e som de alta fidelidade.', 2, 1, NULL, 1199.00, '2024-12-17 15:44:04.099', NULL, true),
  (gen_random_uuid(), 'Xperia 1 V', 'Smartphone com tela OLED 4K de 6,5 polegadas e câmera tripla de 12MP.', 3, 1, NULL, 8999.00, '2024-12-17 15:44:04.099', NULL, true),
  (gen_random_uuid(), 'WH-1000XM5', 'Fones de ouvido over-ear com cancelamento de ruído líder e 30h de bateria.', 3, 1, NULL, 2599.00, '2024-12-17 15:44:04.099', NULL, true),
  (gen_random_uuid(), 'PlayStation 5', 'Console de última geração com suporte a jogos 4K e SSD ultrarrápido.', 3, 1, NULL, 4499.00, '2024-12-17 15:44:04.099', NULL, true),
  (gen_random_uuid(), 'Bravia XR A95K', 'Smart TV OLED 4K de 65 polegadas com Cognitive Processor XR.', 3, 1, NULL, 12499.00, '2024-12-17 15:44:04.099', NULL, true),
  (gen_random_uuid(), 'SRS-XB43', 'Caixa de som portátil com EXTRA BASS e até 24 horas de bateria.', 3, 1, NULL, 799.00, '2024-12-17 15:44:04.099', NULL, true),
  (gen_random_uuid(), 'LG Gram 17', 'Notebook ultraleve com tela de 17 polegadas e SSD de 1TB.', 4, 1, NULL, 11499.00, '2024-12-17 15:44:04.099', NULL, true),
  (gen_random_uuid(), 'OLED evo C2', 'Smart TV OLED 4K de 55 polegadas com processador α9 Gen5 AI.', 4, 1, NULL, 8999.00, '2024-12-17 15:44:04.099', NULL, true),
  (gen_random_uuid(), 'UltraGear 27GN950', 'Monitor gaming 4K de 27 polegadas com taxa de atualização de 144Hz.', 4, 1, NULL, 2999.00, '2024-12-17 15:44:04.099', NULL, true),
  (gen_random_uuid(), 'Tone Free FP9', 'Fones de ouvido com cancelamento ativo de ruído e estojo UVnano.', 4, 1, NULL, 1299.00, '2024-12-17 15:44:04.099', NULL, true),
  (gen_random_uuid(), 'XBOOM Go PL7', 'Caixa de som portátil com resistência à água e até 24 horas de bateria.', 4, 1, NULL, 999.00, '2024-12-17 15:44:04.099', NULL, true),
  (gen_random_uuid(), 'XPS 13 Plus', 'Notebook premium com tela InfinityEdge de 13,4 polegadas e SSD de 512GB.', 5, 1, NULL, 11499.00, '2024-12-17 15:44:04.099', NULL, true),
  (gen_random_uuid(), 'Alienware M16 R2', 'Notebook gamer com Intel Core i9 e Nvidia RTX 4090.', 5, 1, NULL, 19999.00, '2024-12-17 15:44:04.099', NULL, true),
  (gen_random_uuid(), 'Inspiron 15 3520', 'Notebook com Intel Core i5, 8GB de RAM e tela de 15,6 polegadas.', 5, 1, NULL, 4299.00, '2024-12-17 15:44:04.099', NULL, true),
  (gen_random_uuid(), 'Dell G15 Gaming', 'Notebook gamer acessível com Intel Core i7 e GTX 1650.', 5, 1, NULL, 6499.00, '2024-12-17 15:44:04.099', NULL, true),
  (gen_random_uuid(), 'Dell UltraSharp U2723QE', 'Monitor 4K de 27 polegadas com tecnologia IPS Black.', 5, 1, NULL, 3999.00, '2024-12-17 15:44:04.099', NULL, true),
  (gen_random_uuid(), 'Boneco Transformers', 'Boneco articulado da série Transformers, com transformação de robô para veículo.', 6, 2, NULL, 199.00, '2024-12-17 15:44:04.099', NULL, true),
  (gen_random_uuid(), 'Monopoly', 'Jogo de tabuleiro clássico onde o objetivo é comprar propriedades e acumular riquezas.', 6, 2, NULL, 349.00, '2024-12-17 15:44:04.099', NULL, true),
  (gen_random_uuid(), 'Play-Doh', 'Massinha de modelar, ideal para estimular a criatividade das crianças.', 6, 2, NULL, 89.00, '2024-12-17 15:44:04.099', NULL, true),
  (gen_random_uuid(), 'Lego Star Wars', 'Kit de blocos Lego para montar cenas icônicas de Star Wars.', 6, 2, NULL, 499.00, '2024-12-17 15:44:04.099', NULL, true),
  (gen_random_uuid(), 'Nerf Elite', 'Lança dardos Nerf, com capacidade de 12 dardos e alcance de até 27 metros.', 6, 2, NULL, 159.00, '2024-12-17 15:44:04.099', NULL, true),
  (gen_random_uuid(), 'Barbie Fashionista', 'Boneca Barbie com diferentes estilos e roupas modernas.', 7, 2, NULL, 159.00, '2024-12-17 15:44:04.099', NULL, true),
  (gen_random_uuid(), 'Hot Wheels', 'Carrinho de brinquedo da linha Hot Wheels, com vários modelos e pistas para montar.', 7, 2, NULL, 59.00, '2024-12-17 15:44:04.099', NULL, true),
  (gen_random_uuid(), 'American Girl Doll', 'Boneca com várias opções de roupas e acessórios, com temática histórica.', 7, 2, NULL, 249.00, '2024-12-17 15:44:04.099', NULL, true),
  (gen_random_uuid(), 'UNO', 'Jogo de cartas divertido para todas as idades, com regras simples e desafiantes.', 7, 2, NULL, 49.00, '2024-12-17 15:44:04.099', NULL, true),
  (gen_random_uuid(), 'Fisher-Price', 'Brinquedos educativos para bebês e crianças pequenas, com foco no desenvolvimento motor.', 7, 2, NULL, 119.00, '2024-12-17 15:44:04.099', NULL, true),
  (gen_random_uuid(), 'Lego Technic', 'Kit de blocos Lego com peças detalhadas para montagem de veículos e máquinas.', 8, 2, NULL, 499.00, '2024-12-17 15:44:04.099', NULL, true),
  (gen_random_uuid(), 'Lego City', 'Conjunto Lego com temática de cidade, incluindo carros, prédios e figuras.', 8, 2, NULL, 349.00, '2024-12-17 15:44:04.099', NULL, true),
  (gen_random_uuid(), 'Lego Ninjago', 'Kit de Lego com personagens e cenários baseados no universo Ninjago.', 8, 2, NULL, 399.00, '2024-12-17 15:44:04.099', NULL, true),
  (gen_random_uuid(), 'Lego Friends', 'Conjunto Lego com tema de amizade e aventuras em uma cidade fictícia.', 8, 2, NULL, 259.00, '2024-12-17 15:44:04.099', NULL, true),
  (gen_random_uuid(), 'Lego Duplo', 'Blocos de construção grandes e seguros para crianças pequenas.', 8, 2, NULL, 179.00, '2024-12-17 15:44:04.099', NULL, true),
  (gen_random_uuid(), 'Ferro de Passar a Vapor', 'Ferro de passar com vapor contínuo e base cerâmica para melhor deslizamento.', 9, 3, NULL, 199.00, '2024-12-17 15:44:04.099', NULL, true),
  (gen_random_uuid(), 'Liquidificador', 'Liquidificador de 700W com 5 velocidades e função pulsar.', 9, 3, NULL, 399.00, '2024-12-17 15:44:04.099', NULL, true),
  (gen_random_uuid(), 'Cafeteira Elétrica', 'Cafeteira com capacidade de 1,5L, filtro permanente e sistema anti-gotejamento.', 9, 3, NULL, 179.00, '2024-12-17 15:44:04.099', NULL, true),
  (gen_random_uuid(), 'Aspirador de pó ciclônico', 'Aspirador de pó com tecnologia ciclônica e filtro HEPA.', 9, 3, NULL, 649.00, '2024-12-17 15:44:04.099', NULL, true),
  (gen_random_uuid(), 'Secador de Cabelo', 'Secador de cabelo com 2 velocidades e 3 temperaturas ajustáveis.', 9, 3, NULL, 139.00, '2024-12-17 15:44:04.099', NULL, true),
  (gen_random_uuid(), 'Cafeteira Expresso', 'Máquina de café expresso com sistema de cápsulas e espuma de leite.', 10, 3, NULL, 499.00, '2024-12-17 15:44:04.099', NULL, true),
  (gen_random_uuid(), 'Ventilador de Mesa', 'Ventilador de mesa com 3 velocidades e base estável.', 10, 3, NULL, 159.00, '2024-12-17 15:44:04.099', NULL, true),
  (gen_random_uuid(), 'Processador de Alimentos', 'Processador de alimentos com lâminas de inox e várias opções de cortes.', 10, 3, NULL, 349.00, '2024-12-17 15:44:04.099', NULL, true),
  (gen_random_uuid(), 'Fritadeira sem Óleo', 'Fritadeira elétrica sem óleo, com capacidade para 3,2L e 8 predefinições de cozimento.', 10, 3, NULL, 699.00, '2024-12-17 15:44:04.099', NULL, true),
  (gen_random_uuid(), 'Máquina de Lavar Louças', 'Máquina de lavar louças com 12 serviços e sistema de secagem eficiente.', 10, 3, NULL, 1999.00, '2024-12-17 15:44:04.099', NULL, true);