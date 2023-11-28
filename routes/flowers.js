var express = require("express");
const flower_controllers = require("../controllers/flowerController");
var passport = require("passport");
var router = express.Router();
const secured = (req, res, next) => {
    if (req.user) {
        return next();
    }
    res.redirect("/login");
};
// GET flowers
router.get("/", flower_controllers.flower_view_all_Page);
// GET request for one flower.
router.get("/flowers/:id", secured, flower_controllers.flower_detail);
/* GET detail flower page */
router.get("/detail", secured, flower_controllers.flower_view_one_Page);
/* GET create flower page */
router.get("/create", secured, flower_controllers.flower_create_Page);
/* GET create update page */
router.get("/update", secured, flower_controllers.flower_update_Page);
/* GET delete flower page */
router.get("/delete", secured, flower_controllers.flower_delete_Page);
router.post('/login', passport.authenticate('local'), function (req, res) {
    if (req.session.returnTo)
        res.redirect(req.session.returnTo);
    res.redirect('/');
});

module.exports = router;