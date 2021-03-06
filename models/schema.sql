DROP DATABASE meidaJunkie_db

CREATE DATABASE mediaJunkie_db;

USE mediaJunkie_db;

DROP TABLE surveyData;

CREATE table surveyData

(
  id int NOT NULL AUTO_INCREMENT,
  age int,
  genre int,
  director int,
  alone boolean,
  discover boolean,
  visual boolean, 
  plot boolean,
  netflix VARCHAR (50),
  hulu VARCHAR (50),
  prime VARCHAR (50),
  PRIMARY KEY(id)
);