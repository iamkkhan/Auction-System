//define how my products will look like in our APP
// also the schmea and the collection  in the datebase
const mongoose = require("mongoose");

// creating the schema here
// also validating the mongoose here to pass the data
// validating in the form of objects
const bidSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    productID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Products"
    },
    biddingPrice: {
        type: Number,
        required: true
    },
    userInfo: {
        type: String
    },
    bidNote: {
        type: String
    }
});

// exporting the schema in the form of model
module.exports = mongoose.model("Bids", bidSchema);