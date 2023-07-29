const mongoose = require('mongoose');

const inventorySchema = new mongoose.Schema ({
    inventoryType: {
        type:String,
        required: [true, 'Inventory type required'],
        enum: ['in', 'out']
    },
    bloodGroup: {
        type: String,
        required: [true, 'Blood Group is required'],
        enum: ['O+', 'O-', 'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-']
    },
    quantity: {
        type: Number,
        required: [true, 'Quantity is required'],
    },
    organisation:{
        type: mongoose.Schema.type.ObjectId, //since the type of this element would be dynamic hence we would use mongo Db to create to input the data type dynamically
        ref: 'users', //here we created a reference
        require: [true, 'Organisation is required']
    },
    hospital:{
        type: mongoose.Schema.type.ObjectId,
        ref:'usres',
        require: function() {
            return this.inventoryType === 'out';
        }
    },
    donor: {
        type: mongoose.Schema.type.ObjectId,
        ref: 'users',
        require: function() {
            return this.inventoryType === 'in';
        }
    }
},
{ timestamps : true });

module.exports = mongoose.model('inventory', inventorySchema)