const router = require('express').Router();
const Product = require('../models/products');


const checkAuth = require('../middleware/check_auth');
const productController = require('../controllers/products');

// get request, getting all the Products in the database here
router.get('/', productController.getAllProducts);


// creating the route for the post
router.get('/products/add-product', productController.getAddProduct);


// post request, adding the data in the DB storage
router.post('/products/add-product',
    productController.addProducts
);


// adding the comments in the single products
router.post('/products/commentsAdded/:productID', productController.AddCommentsProduct);


// get request for the single users only
router.get('/products/:productID', productController.getSingleProducts);

// get update request for the single users
router.get(
    '/products/edit-product/:productID',
    productController.getupdateProducts
);


// update request for the single users
router.post(
    '/productEdit/:productID',
    productController.updateProducts
);

// delete request for the single users
router.get(
    '/products/delete-product/:productID',
    productController.deleteProducts
);


// adding the bid for the single product
router.post(
    '/products/bidAdded/:productID',
    productController.adddingBid
);

module.exports = router;