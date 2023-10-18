CREATE DATABASE ticTacToe;
USE ticTacToe;

CREATE TABLE users(
id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
username varchar(50) NOT NULL,
imgSrc varchar(400) NOT NULL,
password varchar(300) NOT NULL
);

CREATE TABLE tables(
id varchar(50) NOT NULL PRIMARY KEY,
p_0 INT DEFAULT 0,
p_1 INT DEFAULT 0,
p_2 INT DEFAULT 0,
p_3 INT DEFAULT 0,
p_4 INT DEFAULT 0,
p_5 INT DEFAULT 0,
p_6 INT DEFAULT 0,
p_7 INT DEFAULT 0,
p_8 INT DEFAULT 0,
status INT DEFAULT 1,
winner INT DEFAULT 0
);

CREATE TABLE games(
id varchar(50) NOT NULL PRIMARY KEY,
player1 INT NOT NULL,
player2 INT,
tableRef varchar(50) NOT NULL,
FOREIGN KEY(player1) REFERENCES users(id),
FOREIGN KEY(player2) REFERENCES users(id),
FOREIGN KEY(tableRef) REFERENCES tables(id)
);

DROP TABLE games;
DROP TABLE users;
DROP TABLE tables;

INSERT INTO users (
userName, imgSrc, password
) VALUES (
"11yena", "https://api.dicebear.com/7.x/pixel-art/svg?seed=11yena", "password"
); 

INSERT INTO users (
userName, imgSrc, password
) VALUES (
"merry31", "https://api.dicebear.com/7.x/pixel-art/svg?seed=merry31", "password"
);

INSERT INTO tables (

) VALUES (

);

INSERT INTO games (
player1, player2, tableRef
) VALUES (
1, 2, 1
);

SELECT * FROM users;
SELECT * FROM tables;
SELECT * FROM games;