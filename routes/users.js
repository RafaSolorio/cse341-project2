const express = require('express')
const myController = require('../controllers')

const router = express.Router()


//return all of the documents in users collection.
router.get('/', myController.getUsers)

// POST route to create a new user
router.post('/', myController.createUser)


module.exports = router
