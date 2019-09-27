//define how my products will look like in our APP
// also the schmea and the collection  in the datebase
const mongoose = require('mongoose');



// creating the schema here
// also validating the mongoose here to pass the data 
// validating in the form of objects
const userSchema = mongoose.Schema({

    // email: {
    //     type: String,
    //     required: true,
    //     unique: true,
    //     match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    // },
    // password: {
    //     type: String,
    //     required: true
    // }


})

// exporting the schema in the form of model
module.exports = mongoose.model('Users', userSchema);