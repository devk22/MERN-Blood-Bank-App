const express = require('express');
const { testController } = require('../controllers/testController');

//creating a router object
const router = express.Router(); //.Router adds all the routing functionalities to the router object that we have created

//setting the routes
router.get("/", testController);


//exports
module.exports = router; //this will export all the routes that we create in this file.