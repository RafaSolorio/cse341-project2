const express = require('express')
const myController = require('../controllers')
const validation = require('../middleware/validate')
const { isAuthenticated } = require('../middleware/authenticate')

const router = express.Router()


// return all of the documents in Users collection.
router.get('/', isAuthenticated, myController.getUsers)

// return a single document from Users collection by id
router.get('/:id', isAuthenticated, myController.getUserById)

// POST route to create a new user
router.post('/', validation.saveUser, myController.createUser)

// PUT route to update a user by id
router.put('/:id', validation.saveUser, myController.updateUser)

// DELETE route to delete a user
router.delete('/:id', myController.deleteUser)

module.exports = router
