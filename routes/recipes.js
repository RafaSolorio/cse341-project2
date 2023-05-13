const express = require('express')
const myController = require('../controllers')
const validation = require('../middleware/validate')
const { isAuthenticated } = require('../middleware/authenticate')

const router = express.Router()


///return all of the documents in Recipes collection.
router.get('/', myController.getRecipes)

// return a single document from Recipes collection by id
router.get('/:id', myController.getRecipeById)

// POST route to create a new recipe
router.post('/', isAuthenticated, validation.saveRecipe, myController.createRecipe)

// PUT route to update a user by id
router.put('/:id', isAuthenticated, validation.saveRecipe, myController.updateRecipe)

// DELETE route to delete a recipe
router.delete('/:id', isAuthenticated, myController.deleteRecipe)


module.exports = router