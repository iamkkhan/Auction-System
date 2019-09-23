const router = require('express').Router();

const checkAuth = require('../middleware/check_auth');
const bidController = require('../controllers/bids');

// post request, adding the bidding value to the products
router.post('/products/bid-product', bidController.addBidding);


module.exports = router;