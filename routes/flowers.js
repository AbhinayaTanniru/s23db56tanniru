var express = require("express");
const flower_controlers = require("../controllers/flowerController");
var router = express.Router();
// GET flowers
router.get("/", flower_controlers.flower_view_all_Page);
module.exports = router;