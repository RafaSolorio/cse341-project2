const mongodb = require('../db/connect')
const ObjectId = require('mongodb').ObjectId
const bcrypt = require('bcrypt');

const getUsers = async (req, res, next) => {
    const result = await mongodb.getDb().db().collection('users').find()
    result.toArray().then((lists) => {
        res.setHeader('Content-Type', 'application/json')
        res.status(200).json(lists)
    })
}

const getUserById = (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Must use a valid user id to find a user.');
    }

    const userId = new ObjectId(req.params.id)
    mongodb
        .getDb()
        .db()
        .collection('users')
        .find({ _id: userId })
        .toArray((err, result) => {
            if (err) {
                res.status(400).json({ message: err});
            }
            res.setHeader('Content-Type', 'application/json')
            res.status(200).json(result);
        });
}

const createUser = async (req, res, next) => {
    try {
        const collection = mongodb.getDb().db().collection('users')

        const newUser = {
            userName: req.body.userName,
            email: req.body.email,
            password: await bcrypt.hash(req.body.password, 10),
            dateOfBirth: req.body.dateOfBirth,
        }

        const result = await collection.insertOne(newUser)

        res.status(201).json({ id: result.insertedId })
    } catch (error) {
        console.error(error)
        res.status(500).send('Error internal')
    }
}

const updateUser = async (req, res, next) => {
    try {
        if (!ObjectId.isValid(req.params.id)) {
            res.status(400).json('Must use a valid user id to find a user.');
        }

        const id = req.params.id;
        const collection = mongodb.getDb().db().collection('users');
        const { userName, email, password, dateOfBirth } = req.body;

        const contactId = new ObjectId(id)
  
        const result = await collection.updateOne(
            { _id: contactId },
            { $set: { userName, email, password, dateOfBirth } }
        );
  
        if (result.modifiedCount === 1) {
            return res.status(204).json({ message: 'User updated successfully.' });
        }
  
        return res.status(404).json({ message: 'User not found.' });
    } catch (error) {
        console.error(error);
        return res.status(500).send('Internal server error');
    }
};

const deleteUser = async (req, res) => {
    try {
        if (!ObjectId.isValid(req.params.id)) {
            res.status(400).json('Must use a valid user id to find a user.');
        }

        const collection = mongodb.getDb().db().collection('users');

        const userId = new ObjectId(req.params.id)
  
        const result = await collection.deleteOne({ _id: userId });
  
        if (result.deletedCount === 1) {
            return res.status(200).send();
        }

        return res.status(404).send();
    } catch (error) {
        console.error(error);
        res.status(500).send('Error internal');
    }
}

//   recipes

const getRecipes = async (req, res, next) => {
    mongodb
        .getDb()
        .db()
        .collection('recipes')
        .find()
        .toArray((err, lists) => {
            if (err) {
                res.status(400).json({ message: err});
            }
            res.setHeader('Content-Type', 'application/json')
            res.status(200).json(lists)
    })
}

const getRecipeById = (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Must use a valid recipe id to find a recipe.');
    }

    const recipeId = new ObjectId(req.params.id)
    mongodb
        .getDb()
        .db()
        .collection('recipes')
        .find({ _id: recipeId })
        .toArray((err, result) => {
            if (err) {
                res.status(400).json({ message: err});
            }
            res.setHeader('Content-Type', 'application/json')
            res.status(200).json(result);
        });
}

const createRecipe = async (req, res, next) => {
    try {
        const collection = mongodb.getDb().db().collection('recipes')

        const newRecipe = {
            title: req.body.title,
            description: req.body.description,
            ingredients: req.body.ingredients,
            directions: req.body.directions,
            prepTime: req.body.prepTime,
            cookTime: req.body.cookTime,
            servings: req.body.servings,
        }

        const result = await collection.insertOne(newRecipe)

        res.status(201).json({ id: result.insertedId })
    } catch (error) {
        console.error(error)
        res.status(500).send('Error internal')
    }
}

const updateRecipe = async (req, res, next) => {
    try {
        if (!ObjectId.isValid(req.params.id)) {
            res.status(400).json('Must use a valid recipe id to find a recipe.');
        }

        const id = req.params.id;
        const collection = mongodb.getDb().db().collection('recipes');
        const { title, description, ingredients, directions, prepTime, cookTime, servings } = req.body;

        const recipeId = new ObjectId(id)
  
        const result = await collection.updateOne(
            { _id: recipeId },
            { $set: { title, description, ingredients, directions, prepTime, cookTime, servings } }
        );
  
        if (result.modifiedCount === 1) {
            return res.status(204).json({ message: 'Recipe updated successfully.' });
        }
  
        return res.status(404).json({ message: 'Recipe not found.' });
    } catch (error) {
        console.error(error);
        return res.status(500).send('Internal server error');
    }
};

const deleteRecipe = async (req, res) => {
    try {
        if (!ObjectId.isValid(req.params.id)) {
            res.status(400).json('Must use a valid recipe id to find a recipe.');
        }

        const collection = mongodb.getDb().db().collection('recipes');

        const recipeId = new ObjectId(req.params.id)
  
        const result = await collection.deleteOne({ _id: recipeId });
  
        if (result.deletedCount === 1) {
            return res.status(200).send();
        }

        return res.status(404).send();
    } catch (error) {
        console.error(error);
        res.status(500).send('Error internal');
    }
}

module.exports = {
    getUsers,
    getUserById,
    getRecipes,
    getRecipeById,
    createUser,
    updateUser,
    deleteUser,
    createRecipe,
    updateRecipe,
    deleteRecipe
}
