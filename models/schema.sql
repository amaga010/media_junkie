CREATE DATABASE movieJunkie_db;

USE movieJunkie_db;

CREATE table surveyData

(
  id int NOT NULL AUTO_INCREMENT,
  age int,
  mood VARCHAR (20),
  genre int,
  element VARCHAR (20),
  alone boolean,
  discover VARCHAR (20), 
  director int,
  netflix VARCHAR (50),
  hulu VARCHAR (50),
  prime VARCHAR (50),
  PRIMARY KEY(id)
);
