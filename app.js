const express = require('express');
const app = express();

// handling the incoming request here
const morgan = require('morgan');

// body parser to parse the data from the users in the readable form
const bodyParser = require('body-parser');


// setting up the mongose here to connect the database
const mongose = require('mongoose');
const path = require('path');




// importing the routes
// managing all the route here
const products = require('./api/routes/products');
const orders = require('./api/routes/orders');
const users = require('./api/routes/users');


// connecting the mongo to the application
mongose.connect(`mongodb+srv://SaifurRehman:project999@auction-system-db-9k5mh.mongodb.net/test?retryWrites=true&w=majority`, {
    useNewUrlParser: true
});

// to renove the depreciation error
mongose.Promise = global.Promise;


// logging the morgan here before the routes
app.use(morgan('dev'));


// publically access the folder because no path for this
app.use('/uploads', express.static('uploads'))


// bodyparser here extract the json and make it readable
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());


// handling the CORS CROSS ORIGIN Resource Sharing error here
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');



    // its also passes the option here and the passed here will get here
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');


        return res.status(200).json({});

    }
    // passing the middleware here for the next funtion here
    next();
})




// using the method here for the all the route and handle all the ROUTES here
app.use('/products', products);
app.use('/orders', orders);
app.use('/users', users);




// handling the pages here
// set the view engine to ejs
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


// use res.render to load up an ejs view file

// index page 
app.get('/', (req, res) => {

});

// about page 
app.get('/about', (req, res) => {

});










// setting up the error handling here
app.use((req, res, next) => {
    const err = new Error('Not Found!');
    // setting the status property to show there
    err.status = 404;
    next(err)
})

// handling the passed errors
app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.json({
        ERROR: err.message
    })
})


// exporting the app
module.exports = app;