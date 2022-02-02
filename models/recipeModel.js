// EXEMPLE D'UN CRUD COMPLET :
// Partons du principe que l'on a une base de données de films avec une table movie (id, title)

// Tous les models importent le fichier dbConnect (qui permet de se connecter à la base de données)
// Les models contiennent les CRUD et eventuellement des fonctions supplémentaires mais toujours en lien avec la base de données
// La plupart des fonctions d'un model retournent une promesse
import dbConnect from "../config/db-config.js";

// On crée une fonction qui va envoyer une requête SQL à la base de données,
// afin de récupérer tous les films depuis la base de données
// READ ALL
const getAll = () => {
  return new Promise((resolve, reject) => {
    dbConnect.query("SELECT * FROM recipe", (err, results) => {
      // si la requete n'est pas bonne on retourne une erreur
      if (err) reject(err);
      // sinon on retourne les résultats
      else resolve(results);
    });
  });
};

// READ ONE
const getOneById = (id) => {
  return new Promise((resolve, reject) => {
    dbConnect.query("SELECT * FROM recipe WHERE id = ?", id, (err, result) => {
      if (err) reject(err);
      else resolve(result[0]);
    });
  });
};

// DELETE
const deleteById = (id) => {
  return new Promise((resolve, reject) => {
    dbConnect.query("DELETE FROM recipe WHERE id = ?", id, (err, result) => {
      if (err) reject(err);
      else resolve(result.affectedRows);
    });
  });
};

// CREATE
const createNew = (recipe) => {
  const { name, image, description, id_category } = recipe;
  return new Promise((resolve, reject) => {
    dbConnect.query(
      "INSERT INTO recipe (name, image, description, id_category) VALUES (?, ?, ?, ?)",
      [name, image, description, id_category],
      (err, result) => {
        if (err) reject(err);
        else resolve(result.insertId);
      }
    );
  });
};

// UPDATE
const updateRecipe = (id, recipe) => {
  return new Promise((resolve, reject) => {
    dbConnect.query(
      "UPDATE recipe SET ? WHERE id = ?",
      [recipe, id],
      (err, result) => {
        if (err) reject(err);
        else resolve(result);
      }
    );
  });
};

// exporter toutes les fonctions du model
export default { getAll, getOneById, deleteById, createNew, updateRecipe };
