var express = require("express");
const flower_controlers = require("../controllers/flowerController");
var router = express.Router();
// GET flowers
router.get("/", flower_controlers.flower_view_all_Page);
/* GET detail flower page */
router.get('/detail', flower_controlers.flower_view_one_Page);
/* GET create flower page */
router.get('/create', flower_controlers.flower_create_Page);
/* GET create update page */
router.get('/update', flower_controlers.flower_update_Page);
/* GET delete flower page */
router.get('/delete', flower_controlers.flower_delete_Page);
module.exports = router;