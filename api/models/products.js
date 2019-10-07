//define how my products will look like in our APP
// also the schmea and the collection  in the datebase
const mongoose = require("mongoose");

// creating the schema here
// also validating the mongoose here to pass the data
// validating in the form of objects
const productSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    productImage: {
        type: String,
        required: true
    },
    Category: {
        type: String,
        required: true
    },
    bidDetails: {
        type: Array
    },
    comments: {
        type: Array
    },
    postedBy: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now
    }
});

// exporting the schema in the form of model
module.exports = mongoose.model("Products", productSchema);