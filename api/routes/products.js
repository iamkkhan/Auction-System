const router = require('express').Router();

const checkAuth = require('../middleware/check_auth');
const productController = require('../controllers/products');

// get request, getting all the Products in the database here
router.get('/', productController.getAllProducts);

router.get('/products/add-product', productController.getAddProduct);

// post request, adding the data in the DB storage
router.post('/products/add-product', productController.addProducts);

// get request for the single users only
router.get('/products/:productId', productController.getSingleProducts);

// update request for the single users
router.patch(
    '/products/edit-product/:productId',
    checkAuth,
    productController.updateProducts
);

// delete request for the single users
router.delete(
    '/products/delete-product/:productID',
    checkAuth,
    productController.deleteProducts
);

module.exports = router;