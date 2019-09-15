// importing the product model here
const Orders = require('../models/orders');

// importing the product here to validate if the product is available or not to add the order for it
const Products = require('../models/products');

const mongoose = require('mongoose');







exports.getAllOrders = (req, res, next) => {
    Orders.find().
    populate("product").select("_id quantity product").exec().then(docs => {
        if (docs.length > 0) {
            res.status(200).json({
                count: docs.length,
                orders: docs.map(item => {
                    return {
                        _id: item._id,
                        product: item.product,
                        quantity: item.quantity,
                        request: {
                            type: 'GET',
                            url: `http://localhost:9000/orders/${item._id}`
                        }
                    }
                })
            })
        } else {
            res.status(404).json({
                message: 'No Order Found!'
            })


        }
    }).catch(err => {
        res.status(500).json({
            message: err
        })

    })
}










exports.addOrders = (req, res, next) => {
    Products.findById(req.body.productID).then(prod => {
        const order = new Orders({
            _id: mongoose.Types.ObjectId(),
            quantity: req.body.quantity,
            product: req.body.productID
        });

        return order.save()
    }).then(docs => {
        res.status(201).json({
            msg: "Order Created!",
            order: {
                _id: docs._id,
                product: docs.product,
                quantity: docs.quantity,
                request: {
                    type: 'POST',
                    url: `http://localhost:9000/orders/${docs._id}`
                }
            }
        })
    }).catch(err => {
        res.status(500).json({
            message: 'No Product Found for that ID!'
        })
    })
}










exports.getSingleOrder = (req, res, next) => {
    Orders.findById(req.params.orderID).populate('product').select('_id product quantity').exec().then(docs => {
        if (!docs) {
            return res.status(404).json({
                message: 'No Order Found!!'
            })
        }
        res.status(200).json({
            order: docs,
            request: {
                type: 'GET',
                url: `http://localhost:9000/orders`
            }
        })

    }).catch(err => {
        res.status(500).json({
            message: err
        })
    })
}










exports.deleteOrder = (req, res, next) => {
    Orders.findById(req.params.orderID).then(item => {
        if (item) {
            Orders.deleteOne({
                _id: req.params.orderID
            }).exec().then(docs => {
                res.status(200).json({
                    message: 'Order Deleted!',
                    request: {
                        type: 'DELETE',
                        url: `http://localhost:9000/orders`
                    }
                })
            }).catch(err => {
                res.status(500).json({
                    message: err
                })
            })
        } else {
            res.status(404).json({
                message: 'No Order find to Delete!'
            })

        }

    }).catch(err => {
        res.status(500).json({
            message: err
        })

    })

}