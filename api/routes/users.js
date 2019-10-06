const express = require("express");
const router = express.Router();
const user = require("../models/users");
const bcrypt = require("bcryptjs");
const passport = require("passport");

// // importing the user controllers
// const userController = require('../controllers/users')

// // signup here
// router.post('/signup', userController.UserSignup)

// // user signin
// router.post('/login', userController.userSignin)

// // deleting the users here
// router.delete('/:userID', userController.userDelete)

router.get("/welcome", (req, res) => {
    res.render("pages/Welcome");
});



// signup Handle
router.post("/register", (req, res) => {
    const { name, email, password, Cpassword } = req.body;

    // handling the errors here
    let errors = [];

    // checking the fields here
    if (!name || !email || !password || !Cpassword) {
        errors.push({ msg: "Please Enter All The Required Fields!" });
    }

    if (password !== Cpassword) {
        errors.push({ msg: "Password doesnt match!" });
    }

    if (password.length < 6) {
        errors.push({ msg: "Password length is less then 6!" });
    }

    if (errors.length > 0) {
        res.render("pages/Welcome", {
            errors,
            name,
            email,
            password,
            Cpassword
        });
    } else {
        user.findOne({ email: email }).then(result => {
            if (result) {
                errors.push({ msg: "USER EXIST!" });
                res.render("pages/Welcome", {
                    errors,
                    name,
                    email,
                    password,
                    Cpassword
                });
            } else {
                const newUser = new user({
                    name,
                    email,
                    password
                });

                // hashing the password here
                bcrypt.genSalt(10, (err, salt) =>
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if (err) throw err;

                        newUser.password = hash;
                        console.log(1);

                        newUser
                            .save()
                            .then(results => {
                                req.flash(
                                    "success_msg",
                                    "Woah!, Registered You can now login MAN"
                                );
                                res.redirect("/welcome");
                            })
                            .catch(error => {
                                res.send(err);
                                console.log(err);
                            });
                    })
                );
            }
        });
    }
});

// login Handle
router.post("/welcome", (req, res, next) => {
    passport.authenticate("local", {
        successRedirect: "products/add-product",
        failureRedirect: "/welcome",
        failureFlash: true
    })(req, res, next);
});

// logout Handle
router.get("/logout", (req, res, next) => {
    req.logOut();
    req.flash("success_msg", "You're logout!");
    res.redirect("/welcome");
});

module.exports = router;