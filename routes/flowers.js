var express = require("express");
const flower_controlers = require("../controllers/flowerController");
var router = express.Router();
// GET flowers
router.get("/", flower_controlers.flower_view_all_Page);
/* GET detail flower page */
router.get('/detail', flower_controlers.flower_view_one_Page);
/* GET create flower page */
router.get('/create', flower_controlers.flower_create_Page);
module.exports = router;