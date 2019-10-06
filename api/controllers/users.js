// const mongoose = require('mongoose');

// // for authentication the tokem
// const jwt = require('jsonwebtoken');


// // authentication bcrypt here to encrypt the password
// const bcrypt = require('bcrypt');


// // importing the product model here
// const Users = require('../models/users');






// exports.UserSignup = (req, res, next) => {
//     Users.find({
//         email: req.body.email
//     }).exec().then(docs => {
//         if (docs.length >= 1) {
//             res.status(409).json({
//                 message: 'User already exists there!'
//             })

//         } else {
//             bcrypt.hash(req.body.password, 10, (err, hash) => {
//                 if (err) {
//                     res.status(500).json({
//                         message: err
//                     })
//                 } else {
//                     const users = new Users({
//                         _id: mongoose.Types.ObjectId(),
//                         email: req.body.email,
//                         password: hash,
//                     })
//                     users.save().then(result => {
//                         console.log(result)
//                         res.status(201).json({
//                             message: 'User Created!'
//                         })
//                     }).catch(err => {
//                         res.status(404).json({
//                             message: err
//                         })

//                     })

//                 }
//             })

//         }

//     })
// }





// exports.userSignin = (req, res, next) => {
//     // find gives array
//     // findOne gives direct value

//     Users.findOne({
//         email: req.body.email
//     }).exec().then(users => {
//         if (users) {

//             bcrypt.compare(req.body.password, users.password, (err, result) => {


//                 if (err) {
//                     return res.status(401).json({
//                         message: 'Auth Failed!'
//                     })
//                 }
//                 if (result) {
//                     const jwtToken = jwt.sign({
//                         userEmail: users.email,
//                         userId: users._id
//                     }, 'secret', {
//                         expiresIn: '1hr'

//                     })
//                     return res.status(200).json({
//                         message: 'Auth Successful!',
//                         jwtToken
//                     })
//                 }
//                 res.status(401).json({
//                     message: 'Auth Failed!'
//                 })
//             })

//         } else {
//             return res.status(401).json({
//                 message: 'Auth Failed!, NO users exits!'
//             })
//         }
//     }).catch(err => {
//         res.status(500).json({
//             message: 'HELLO THERE',
//         })
//     })
// }








// exports.userDelete = (req, res, next) => {
//     Users.findById(req.params.userID).exec().then(results => {
//         if (results) {
//             Users.remove({
//                 _id: req.params.userID
//             }).exec().then(result => {
//                 res.status(200).json({
//                     message: 'User Deleted!'
//                 })

//             }).catch(err => {
//                 res.status(500).json({
//                     message: err
//                 })
//             })

//         } else {
//             res.status(404).json({
//                 message: 'User already deleted!'
//             })

//         }

//     }).catch(error => {
//         res.status(404).json({
//             message: error
//         })

//     })

// }