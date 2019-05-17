CREATE DATABASE database_links;

USE database_links;

-- Crear usuarios
CREATE TABLE users(
    id INT(11) NOT NULL,
    username VARCHAR(16) NOT NULL,
    password VARCHAR(60) NOT NULL,
    fullname VARCHAR(100) NOT NULL
);

ALTER TABLE users
    ADD PRIMARY KEY (id);

--ALTER TABLE users
    --MODIFY id INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 2;

--DESCRIBE users;

-- Crear links
CREATE TABLE links(
    id INT(11) NOT NULL,
    title VARCHAR(50) NOT NULL,
    url VARCHAR(255) NOT NULL,
    description TEXT,
    user_id INT(11),
    created_at TIMESTAMP NOT NULL DEFAULT current_timestamp,
    CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES users(id) --Relacionar user_id con el id del usuario de la tabla users
);