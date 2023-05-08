const express = require('express')
const myController = require('../controllers')
const validation = require('../middleware/validate')

const router = express.Router()


//return all of the documents in users collection.
router.get('/', myController.getUsers)

// POST route to create a new user
router.post('/', validation.saveUser, myController.createUser)

// PUT route to update a user by id
router.put('/:id', validation.saveUser, myController.updateUser)

// DELETE route to delete a user
router.delete('/:id', myController.deleteUser)

module.exports = router
