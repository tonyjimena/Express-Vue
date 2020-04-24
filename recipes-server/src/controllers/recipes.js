// controllers/recipes.js
import { Recipe } from '../models'

class RecipesController {
    async recipe (req, res, next) {
      // return res
      //   .status(200)
      //   .json({ key: 'value' })
      const data = await Recipe().getAll()

      return res
        .status(200)
        .json(data)
    }

    async addRecipe(req, res, next) {
      const newRecipe = Recipe() ({
        title: req.body.title,
        description: req.body.description,
        persons: req.body.persons,
        difficulty: req.body.difficulty,
        time: req.body.time,
        ingredients: req.body.ingredients
      })

      const data = await newRecipe.save()

      return res
        .status(201)
        .json(data)
    }
  
    async editRecipeById(req, res, next) {
      const newRecipe = {
        title: req.body.title,
        description: req.body.description,
        persons: req.body.persons,
        difficulty: req.body.difficulty,
        time: req.body.time,
        ingredients: req.body.ingredients
      }

      const data = await Recipe()
        .findOneAndUpdate(
          { _id: req.params.id },
          newRecipe
        )

      return res
        .status(200)
        .json(data)
    }
  
    async recipeById (req, res, next) {
      // return res
      //   .status(200)
      //   .json({ id: req.params.id })
      const data = await Recipe().getById(req.params.id)

      return res
        .status(200)
        .json(data)
    }
  }
  
  export default new RecipesController()