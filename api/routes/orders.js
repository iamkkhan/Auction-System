const express = require('express');
const router = express();


// importing the check-auth middleware here
const checkAuth = require('../middleware/check_auth');

// importing the controller here
const orderController = require('../controllers/orders')


// get request
router.get('/', checkAuth, orderController.getAllOrders);



// post request
router.post('/', checkAuth, orderController.addOrders);



// get request for the single users
router.get('/:orderID', checkAuth, orderController.getSingleOrder);



// delete request for the single users
router.delete('/:orderID', checkAuth, orderController.deleteOrder);



module.exports = router;