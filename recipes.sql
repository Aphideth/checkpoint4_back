
CREATE TABLE category
(
  id   INT          NOT NULL AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE recipe
(
  id          INT          NOT NULL AUTO_INCREMENT,
  name        VARCHAR(255) NOT NULL,
  image       VARCHAR(255) NOT NULL,
  description LONGTEXT     NOT NULL,
  id_category INT          NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE user
(
  id       INT          NOT NULL AUTO_INCREMENT,
  email    VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
  is_admin BOOLEAN      NOT NULL DEFAULT 0,
  PRIMARY KEY (id)
);

ALTER TABLE recipe
  ADD CONSTRAINT FK_category_TO_recipe
    FOREIGN KEY (id_category)
    REFERENCES category (id);

        
