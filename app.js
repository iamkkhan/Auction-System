const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const multer = require("multer");
const expressLayouts = require("express-ejs-layouts");
const app = express();

// for the msg after the redirect store in sessions
const flash = require("connect-flash");
const session = require("express-session");

const passport = require("passport");

require("./api/config/passport")(passport);

const userRoutes = require("./api/routes/users");
const bidRoutes = require("./api/routes/bids");
const productRoutes = require("./api/routes/products");
const searchRoutes = require("./api/routes/search");

app.use(morgan("dev"));

// bodyParser here extract the json and make it readable
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());

const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./uploads");
    },
    filename: (req, file, cb) => {
        cb(null, new Date().toISOString().replace(/:/g, "-") + file.originalname);
    }
});

const fileFilter = (req, file, cb) => {
    if (
        file.mimetype === "image/png" ||
        file.mimetype === "image/jpg" ||
        file.mimetype === "image/jpeg"
    ) {
        cb(null, true);
    } else {
        cb(null, false);
    }
};

// set the view engine to ejs
// app.use(expressLayouts);
app.set("view engine", "ejs");
app.set("views", "views");

// using the name value here to get the value, "File" is the value of name in the input field of the input file
app.use(multer({ storage: fileStorage, fileFilter }).single("File"));
app.use(express.static(path.join(__dirname, "/uploads")));

// handling the CORS CROSS ORIGIN Resource Sharing error here
app.use(cors());

// flash msgs here and express session here (Middleware)
app.use(
    session({
        secret: "hello",
        resave: true,
        saveUninitialized: true
    })
);

// passport middleware
app.use(passport.initialize());
app.use(passport.session());

// flash here
app.use(flash());

// global variables here
app.use((req, res, next) => {
    res.locals.success_msg = req.flash("success_msg");
    res.locals.error_msg = req.flash("error_msg");
    res.locals.error = req.flash("error");
    next();
});

// using the method here for the all the route and handle all the ROUTES here
app.use(userRoutes);
app.use(bidRoutes);
app.use(productRoutes);
app.use(searchRoutes);



// serving the css files static here
app.use(express.static(path.join(__dirname, "css")));



// serving the js files static here
app.use(express.static(path.join(__dirname, "js")));


// serving the images folder here
app.use(express.static(path.join(__dirname, "img")));



// setting up the error handling here
app.use((req, res, next) => {
    const err = new Error("Not Found!");
    // setting the status property to show there
    err.status = 404;
    next(err);
});

// handling the passed errors
app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.json({
        ERROR: err.message
    });
});

// connecting the mongo to the application
mongoose
    .connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(result => {
        console.log(`Connected Successfully to MongoDB!`);
        app.listen(process.env.PORT, () => {
            console.log(`Server running on PORT: ${process.env.PORT}`);
        });
    })
    .catch(err => console.log(`Connection Failed to MongoDB : ${err}`));