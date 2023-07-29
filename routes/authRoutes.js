//This file contains all the paths related to the user and the authentication paths
const express = require('express');
const { registerController, loginController, currentUserController } = require('../controllers/authController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router()

//routes
//REGISTER || POST (method)
router.post('/register', registerController);

//LOGIN || POST (method)
router.post('/login', loginController);

//Get current USER || GET (method)
router.get('/current-user', authMiddleware, currentUserController)

module.exports = router;