var express = require("express");
const flower_controlers = require("../controllers/flowerController");
var router = express.Router();
var passport = require('passport');
// GET flowers
router.get("/", flower_controlers.flower_view_all_Page);
/* GET detail flower page */
router.get('/detail', flower_controlers.flower_view_one_Page);
/* GET create flower page */
router.get('/create', flower_controlers.flower_create_Page);
/* GET update flower page */
const secured = (req, res, next) => {
    if (req.user) {
        return next();
    }
    res.redirect("/login");
}
router.get('/update', secured, flower_controlers.flower_update_Page);
router.post('/login', passport.authenticate('local'), function(req, res) {
    res.redirect('/');
    });
    
/* GET delete flower page */
router.get('/delete', flower_controlers.flower_delete_Page);
module.exports = router;