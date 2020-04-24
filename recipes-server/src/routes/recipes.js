// routes/recipes.js

import express from 'express'
import RecipesController from '../controllers/recipes'
import { auth } from '../middlewares'

const router = express.Router()

router.use(auth)

router.route('/')

  .get(RecipesController.recipe)
  .post(RecipesController.addRecipe)


router.route('/:id')
  .get(RecipesController.recipeById)
  .put(RecipesController.editRecipeById)

export default router