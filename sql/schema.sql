CREATE TABLE carriers (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL UNIQUE,
  code INT NOT NULL
);

INSERT INTO carriers (name, code) VALUES ('Vivo', 15);
INSERT INTO carriers (name, code) VALUES ('Tim', 41);
INSERT INTO carriers (name, code) VALUES ('Oi', 31);
INSERT INTO carriers (name, code) VALUES ('Claro', 21);

CREATE TABLE phones (
  id SERIAL PRIMARY KEY,
  number VARCHAR(20) NOT NULL UNIQUE,
  carrier_id INT REFERENCES carriers(id),
  name VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  cpf VARCHAR(11) NOT NULL
);
