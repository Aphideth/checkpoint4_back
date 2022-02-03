import express from "express";
import Joi from "joi";
const router = express.Router();
import Recipe from "../models/recipeModel.js";

const schemaRecipe = Joi.object({
  name: Joi.string().max(255).required(),
  image: Joi.string().max(255).required(),
  description: Joi.string().required(),
  id_category: Joi.number().integer().required(),
});

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

router.post("/", async (req, res) => {
  const { name, image, description, id_category } = req.body;
  try {
    const { error, value } = await schemaRecipe.validate({
      name,
      image,
      description,
      id_category,
    });
    const lastInsertId = await Recipe.createNew(value);
    if (lastInsertId) {
      const newRecipe = await Recipe.getOneById(lastInsertId);
      res.json(newRecipe);
    } else res.status(422).json({ message: error.message });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const result = await Recipe.deleteById(id);
    result
      ? res.json({ message: `RecipeId ${id} has been deleted !` })
      : res.status(404).json({ message: "Recipe not found" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put("/:id", async (req, res) => {
  const { name, image, description, id_category } = req.body;
  try {
    const { error, value } = await schemaRecipe.validate({
      name,
      image,
      description,
      id_category,
    });
    const recipeUpdate = await Recipe.updateRecipe(req.params.id, value);
    if (recipeUpdate) res.json(value);
    else res.status(422).json({ message: error.message });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
export default router;
