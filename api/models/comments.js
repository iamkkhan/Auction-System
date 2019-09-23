//define how my products will look like in our APP
// also the schmea and the collection  in the datebase
const mongoose = require('mongoose');

// creating the schema here
// also validating the mongoose here to pass the data 
// validating in the form of objects
const commentSchema = mongoose.Schema({
    productID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Products'
    },
    userName: {
        type: String,
        required: true
    },
    comment: {
        type: String,
        required: true
    }
})

// exporting the schema in the form of model
module.exports = mongoose.model('Comments', commentSchema);