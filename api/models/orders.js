//define how my products will look like in our APP
// also the schmea and the collection  in the datebase
const mongoose = require('mongoose');

// importing the product model here
const Product = require('../models/products');


// creating the schema here
// also validating the mongoose here to pass the data 
// validating in the form of objects
const orderSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    // connected to which product
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: Product,
        required: true
    },
    quantity: {
        type: Number,
        default: 1
    }
})

// exporting the schema in the form of model
module.exports = mongoose.model('Orders', orderSchema)