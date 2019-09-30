const router = require("express").Router();
const Product = require("../models/products");
const moment = require("moment");
const { ensureAuthenticated } = require("../config/auth");
const checkAuth = require("../middleware/check_auth");

// searhcing the products here
router.get("/search-product", (req, res, next) => {
    Product.find({ Category: req.query.search })
        .then(docs => {
            if (docs.length < 1) {
                res.render("pages/noProducts", {
                    msg: "NO"
                });
            } else {
                var getDate = moment(docs.date).format("YYYY, MM, D,  h:mm:ss a");
                var dateFromNow = moment(getDate).fromNow();
                res.render("pages/searchProducts", {
                    search: req.query.search,
                    data: docs,
                    formatDate: moment(docs.date).format("MMMM Do YYYY"),
                    NOW: dateFromNow
                });
            }
        })
        .catch(error => res.send(`Message:${error}`));
});

module.exports = router;