const express = require('express')
const myController = require('../controllers')

const router = express.Router()


///return all of the documents in recipes collection.
router.get('/', myController.getRecipes)


module.exports = router