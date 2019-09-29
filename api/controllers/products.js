// importing the product model here
const Product = require("../models/products");
const Comment = require("../models/comments");
const mongoose = require("mongoose");
// include node fs module
var fs = require("fs");

exports.getAllProducts = (req, res, next) => {
    // finding all the documents here
    Product.find()
        .select("_id name price description productImage")
        .sort({ _id: -1 })
        .exec()
        .then(doc => {
            if (doc.length > 0) {
                const response = {
                    count: doc.length,
                    // to modify the items we get from the DB, pass into a new array and add the new things accordingly
                    products: doc.map(item => {
                        return {
                            name: item.name,
                            price: item.price,
                            _id: item._id,
                            productImage: item.productImage,
                            description: item.description,
                            request: {
                                type: "GET",
                                url: `http://localhost:9000/products/${item._id}`
                            }
                        };
                    })
                };

                res.render("pages/index", {
                    res: doc
                });

                res.status(200).json(response);
            } else {
                res.render("pages/index", {
                    errs: "No Data Found"
                });
                res.status(404).json({
                    message: "No Data Found Sir!"
                });
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                message: err
            });
        });
};

// creating the post route here
exports.getAddProduct = (req, res, next) => {
    res.render("pages/addProducts", {
        USER: req.user.name
    });
};

exports.AddCommentsProduct = (req, res, next) => {
    // getting the id here
    let ID = req.params.productID;

    Product.update({ _id: ID }, { $push: { comments: req.body } })
        .exec()
        .then(AddComment => {
            res.redirect(`/products/${ID}`);
        });
};

exports.addProducts = (req, res, next) => {
    // // creating the instant here
    console.log(req.body);
    const products = new Product({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.Name,
        price: req.body.Price,
        description: req.body.Description,
        productImage: req.file.filename,
        Category: req.body.selectpicker
    });

    // saving into the DB here
    products
        .save()
        .then(result => {
            if (result) {
                res.render("pages/addProducts", { MSG: "Added!", USER: req.user.name });
            }

            res.status(201).json({
                message: "Product Added!",
                Product: {
                    name: result.name,
                    price: result.price,
                    _id: result._id,
                    request: {
                        type: "POST",
                        url: `http://localhost:9000/products/${result._id}`
                    }
                }
            });
        })
        .catch(err => {
            res.send(err);
            res.status(500).json({
                message: err
            });
        });
};

exports.getSingleProducts = (req, res, next) => {
    // getting the id here
    let ID = req.params.productID;

    Product.findById(ID)
        .select("_id name price description productImage bidDetails comments")
        .exec()
        .then(doc => {
            res.render("pages/products", {
                singleRes: doc
            });

            // res.status(200).json({
            //     product: doc,
            //     request: {
            //         type: 'GET',
            //         url: `http://localhost:9000/products`
            //     }
            // });
        })
        .catch(err => {
            res.status(500).json({
                message: "err"
            });
        });
};

exports.getupdateProducts = (req, res, next) => {
    // getting the id here
    let ID = req.params.productID;

    // making an array of obj here
    // const updateOps = {};
    // for (const ops of req.body) {
    //     updateOps[ops.propName] = ops.value;
    // }

    Product.findById({ _id: ID }, (err, prod) => {
        res.render("pages/edit-product", {
            prod
        });
    });
};

exports.updateProducts = (req, res, next) => {
    let ID = req.params.productID;

    Product.update({ _id: ID }, {
            $set: {
                name: req.body.Name,
                description: req.body.Description,
                price: req.body.Price,
                productImage: req.file.filename
            }
        })
        .exec()
        .then(add => {
            res.redirect("/");
        })
        .catch(notAdd => {
            res.send("Error while Updating!!");
        });
};

exports.deleteProducts = (req, res, next) => {
    // getting the id here
    let ID = req.params.productID;

    Product.findById(ID)
        .exec()
        .then(results => {
            fs.unlink(`uploads/${results.productImage}`, err => {
                if (err) throw err;
            });

            Product.deleteOne({ _id: ID })
                .then(reslt => {
                    res.redirect("/");
                })
                .catch(errs => {
                    res.send("Error While Deleting!");
                });
        })
        .catch(error => {
            res.send("Error While Deleting!");
        });
};

// adding the bid here
exports.adddingBid = (req, res, next) => {
    ID = req.params.productID;

    Product.update({ _id: ID }, { $push: { bidDetails: req.body } })
        .exec()
        .then(updateBid => {
            res.redirect(`/products/${ID}`);
        });
};