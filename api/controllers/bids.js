// importing the product model here
const bidding = require('../models/bids');
const mongoose = require('mongoose');

exports.addBidding = (req, res, next) => {
    // creating the instant here
    const bids = new bidding({
        _id: new mongoose.Types.ObjectId(),
        biddingValue: req.body.biddingValue,
        bidNote: req.body.bidNote,
    });

    // saving into the DB here
    bids
        .save()
        .then(result => {
            res.status(201).json({
                message: 'Bid Added!',
                BID: {
                    biddingValue: result.biddingValue,
                    bidNote: result.bidNote,
                    _id: result._id,
                    request: {
                        type: 'POST',
                        url: `http://localhost:9000/products/bid-product/${result.id}`
                    }
                }
            });
            console.log(result)
        })
        .catch(err => {
            res.status(500).json({
                message: err
            });
        });
};