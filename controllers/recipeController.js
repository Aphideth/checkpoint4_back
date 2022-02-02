import express from "express";
import Joi from "joi";
const router = express.Router();
import Recipe from "../models/recipeModel.js";
// Dans ce controller, toutes les routes commencent par /home cf(routes/routings.js L:8)

router.get("/", async (req, res) => {
  try {
    // On récupère toutes les articles depuis le model qui lui meme connect avec la base de données
    const recipes = await Recipe.getAll();
    // On envoie les données récupérées au client
    res.json(recipes);
  } catch (error) {
    // sinon erreur 500
    res.status(500).json({ message: error.message });
  }
});

router.get("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const recipe = await Recipe.getOneById(id);
    recipe
      ? res.json(recipe)
      : res.status(404).json({ message: `Recipe not found` });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
