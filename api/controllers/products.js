// importing the product model here
const Product = require('../models/products');

exports.getAllProducts = (req, res, next) => {
  // finding all the documents here
  Product.find()
    .select('_id name price productImage')
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
              request: {
                type: 'GET',
                url: `http://localhost:9000/products/${item._id}`
              }
            };
          })
        };

        res.render('pages/index', {
          res: doc
        });
        // dek yahn index render ki tou /products p uthaya usne
        // age me index kru tou nh utha rha ha
        // ap dekh addproduct tou me dalrha hu button p usme bh yehi same error derha ha na mean ye k route ka bhand ha

        // res.status(200).json(response);
      } else {
        res.status(404).json({
          message: 'No Data Found Sir!'
        });
      }
    })
    .catch(err => {
      res.status(500).json({
        message: err
      });
    });
};

exports.getAddProduct = (req, res, next) => {
  res.render('pages/addProducts');
};

exports.addProducts = (req, res, next) => {
  console.log(req.file);
  console.log(req.local);

  // creating the instant here
  const products = new Product({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    price: req.body.price,
    description: req.body.description,
    productImage: req.file.path
  });

  Product.create(products, (err, newProd) => {
    if (err) {
      console.log(err);
    } else {
      res.render('/');
      console.log('Hello');
    }
  });

  // saving into the DB here
  products
    .save()
    .then(result => {
      res.status(201).json({
        message: 'Order Added!',
        Product: {
          name: result.name,
          price: result.price,
          _id: result._id,
          productImage: result.productImage,
          request: {
            type: 'POST',
            url: `http://localhost:9000/products/${result._id}`
          }
        }
      });
    })
    .catch(err => {
      res.status(500).json({
        message: err
      });
    });
};

exports.getSingleProducts = (req, res, next) => {
  // getting the id here
  const ID = req.params.productID;

  Product.findById(ID)
    .select('_id name price productImage')
    .exec()
    .then(doc => {
      res.render('../views/pages/products', {
        singleRes: doc
      });

      res.status(200).json({
        product: doc,
        request: {
          type: 'GET',
          url: `http://localhost:9000/products`
        }
      });
    })
    .catch(err => {
      res.status(500).json({
        message: err
      });
    });
};

exports.updateProducts = (req, res, next) => {
  // getting the id here
  const ID = req.params.productID;

  // making an array of the update value here
  const updateOp = {};
  for (const op of req.body) {
    updateOp[op.propName] = op.value;
  }

  Product.update(
    {
      _id: ID
    },
    {
      $set: updateOp
    }
  )
    .exec()
    .then(results => {
      res.status(200).json({
        message: `Product Updated!`,
        request: {
          type: 'PATCH',
          url: `http://localhost:9000/products/${ID}`
        }
      });
    })
    .catch(err => {
      res.status(500).json({
        message: err
      });
    });
};

exports.deleteProducts = (req, res, next) => {
  // getting the id here
  const ID = req.params.productID;
  Product.remove({
    _id: ID
  })
    .exec()
    .then(doc => {
      res.status(200).json({
        message: 'Item Deleted!'
      });
    })
    .catch(err => {
      res.status(500).json({
        message: 'No data found!',
        request: {
          type: 'DELETE',
          url: `http://localhost:9000/products`
        }
      });
    });
};
