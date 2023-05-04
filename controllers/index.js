const mongodb = require('../db/connect')
//const ObjectId = require('mongodb').ObjectId

const getUsers = async (req, res, next) => {
    const result = await mongodb.getDb().db().collection('users').find()
    result.toArray().then((lists) => {
        res.setHeader('Content-Type', 'application/json')
        res.status(200).json(lists)
    })
}

const createUser = async (req, res, next) => {
    try {
        const collection = mongodb.getDb().db().collection('users')

        const newUser = {
            userName: req.body.userName,
            email: req.body.email,
            password: req.body.password,
            dateOfBirth: req.body.dateOfBirth,
        }

        const result = await collection.insertOne(newUser)

        res.status(201).json({ id: result.insertedId })
    } catch (error) {
        console.error(error)
        res.status(500).send('Error internal')
    }
}

const getRecipes = async (req, res, next) => {
    const result = await mongodb.getDb().db().collection('recipes').find()
    result.toArray().then((lists) => {
        res.setHeader('Content-Type', 'application/json')
        res.status(200).json(lists)
    })
}

module.exports = {
    getUsers,
    getRecipes,
    createUser
}
