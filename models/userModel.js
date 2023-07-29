const mongoose = require('mongoose');

const userSchema = new mongoose.Schema ({
    role:{
        type:String,
        required:[true, 'Role is Required'],
        enum:['admin', 'organization', 'donor', 'hospital']
    },
    name:{
        type:String,
        required: function() {
            if(this.role === 'admin' || this.role === 'user'){
                return true
            }
            return false;
        }
    },
    organisationName: {
        type:String,
        required: function() {
            if (this.role == 'organization') {
                return true
            }
            return false
        }
    },
    hospitalName: {
        type:String,
        required: function() {
            if (this.role === 'hospital') {
                return true
            }
            return false
        }
    },
    email:{
        type:String,
        required:[true, 'Email is required'],
        unique:true, //sets the  email to unique that means that onlyone account can be vreated with one email
    },
    password:{
        type:String,
        required:[true, 'Passowrd is required'],
    },
    website:{
        type: String
    },
    address:{
        type: String,
        required:[true, 'Address is required']
    },
    phone:{
        type: String,
        required:[true, 'Phone Number is required']
    },
},
{timestamps:true});

module.exports = mongoose.model('users', userSchema) //This will create a collection of new user with reference to the above userSchema