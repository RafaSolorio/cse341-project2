const validator = require('../helpers/validate');

const saveUser = (req, res, next) => {
  const validationRule = {
    userName: 'required|string',
    email: 'required|email',
    password: 'required|string|min:8|max:15',
    dateOfBirth: 'required|date'
  };
  validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      res.status(412).send({
        success: false,
        message: 'Validation failed',
        data: err
      });
    } else {
      next();
    }
  });
};

const saveRecipe = (req, res, next) => {
  const validationRule = {
    title: 'required|string',
    description: 'required|string',
    ingredients: 'required|string',
    directions: 'required|string',
    prepTime: 'required|numeric',
    cookTime: 'required|numeric',
    servings: 'numeric',
  };
  validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      res.status(412).send({
        success: false,
        message: 'Validation failed',
        data: err
      });
    } else {
      next();
    }
  });
};

module.exports = {
  saveUser,
  saveRecipe
};