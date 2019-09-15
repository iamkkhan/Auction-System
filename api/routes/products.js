const express = require('express');
const router = express();


// upload file using this package
const multer = require('multer');


// importing the check-auth middleware here
const checkAuth = require('../middleware/check_auth');





// where to store and rename the file
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './uploads/');
    },
    filename: function(req, file, cb) {
        cb(null, file.originalname);

    }
})

const fileFilter = (req, file, cb) => {
    // accept
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpg') {
        cb(null, true)
    }
    // reject
    else {
        cb(null, false)
    }
};


const uploadFile = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
});

// where to store file



// importing the controller here
const productController = require('../controllers/products')



// get request, getting all the Products in the database here
router.get('/', productController.getAllProducts);



// post request, adding the data in the DB storage
router.post('/', checkAuth, uploadFile.single('productImage'), productController.addProducts);


// get request for the single users only
router.get('/:productID', productController.getSingleProducts);


// update request for the single users
router.patch('/:productID', checkAuth, productController.updateProducts);


// delete request for the single users
router.delete('/:productID', checkAuth, productController.deleteProducts);



module.exports = router;