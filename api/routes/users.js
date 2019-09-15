const express = require('express');
const router = express();

// importing the user controllers
const userController = require('../controllers/users')



// signup here
router.post('/signup', userController.UserSignup)



// user signin
router.post('/login', userController.userSignin)



// deleting the users here
router.delete('/:userID', userController.userDelete)




module.exports = router;