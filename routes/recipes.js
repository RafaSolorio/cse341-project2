const express = require('express')
const myController = require('../controllers')
const validation = require('../middleware/validate')

const router = express.Router()


///return all of the documents in recipes collection.
router.get('/', myController.getRecipes)

// POST route to create a new recipe
router.post('/', validation.saveRecipe, myController.createRecipe)

// PUT route to update a user by id
router.put('/:id', validation.saveRecipe, myController.updateRecipe)

// DELETE route to delete a recipe
router.delete('/:id', myController.deleteRecipe)


module.exports = router