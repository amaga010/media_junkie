DROP DATABASE movieJunkie_db

CREATE DATABASE meidaJunkie_db;

USE movieJunkie_db;

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