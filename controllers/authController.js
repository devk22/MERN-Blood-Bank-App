const { hash } = require("bcrypt");
const userModel = require("../models/userModel");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


//Controller and functions for registering a user
const registerController = async(req, res) => {
    try {
        const existingUser = await userModel.findOne({email:req.body.email});

        //validation
        if(existingUser) {
            return res.status(200).send({
                success: false,
                message: 'User Already Exists'
            })
        }
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(req.body.password, salt) //this encrypts our password using the bcrypt library in order to keep the passowrd safe
        req.body.password = hashedPassword //this replaces the password entered with the hashed password

        //rest data (getting all the remaining data from the user)
        const user = new userModel(req.body)
        await user.save() //saves all the abive information
        return res.status(201).send({
            success: true,
            message: 'User Registered Successfully',
            user,
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({ //500: Internal Server Error
            success: false,
            message: "Error in Register API",
            error
        })
    }
}


//controller and functions for login purposes
const loginController = async (req, res) => { //callback fn hai that is why we'll use req, res
    try {
        const user = await userModel.findOne({email:req.body.email});
        if(!user) {
            res.status(404).send({
                success:false,
                message:"Invalid Credentials"
            })
        }

        //comparing password if the user account exists, we'll use the bcrypt package for this
        const comparePassword = await bcrypt.compare(req.body.password, user.password);
        if(!comparePassword) {
            return res.status(500).send({
                success:false,
                message:"Invalid Credentials"
            })
        }

        //creating a token to return if we get the right credentials
        //we have encrypted the token here
        const token = jwt.sign({userId:user._id}, process.env.JWT_SECRET, {expiresIn:'1d'});
        return res.status(200).send({
            success:true,
            message:'Login Successful',
            token,
            user,
        });
    } catch (error) {
        res.status(500).send({
            success:false,
            message:'Error in Login API',
            error
        })
    }
}

//Get current user
const currentUserController = async (req, res) => {
    try {
        const user = await userModel.findOne({_id:req.body.userId})
        return res.status(200).send({
            success: true,
            message: 'User Fetched Successfully',
            user
        })
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: 'Unable to get the ccurrent User',
            error
        })
    }
}

module.exports = {registerController, loginController, currentUserController} //enclosing in {} because we want to export it as an object as we are going to have multiple functions