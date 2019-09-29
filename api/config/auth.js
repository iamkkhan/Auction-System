module.exports = {
    ensureAuthenticated: function(req, res, next) {
            if (req.isAuthenticated()) {
                return next();
            }
            req.flash("error_msg", "Please log in first for the further!");
            res.redirect("/login");
        }
        //, forwardAuthenticated: function(req, res, next) {
        //     if (!req.isAuthenticated()) {
        //         return next();
        //     }
        //     res.redirect("pages/addProducts");
        // }
};