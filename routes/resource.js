var express = require('express');
var router = express.Router();
// Require controller modules.
var api_controller = require('../controllers/api');
var flower_controller = require('../controllers/flowerController');
/// API ROUTE ///
// GET resources base.
router.get('/', api_controller.api);
/// FLOWER ROUTES ///
// POST request for creating a Flower.
router.post('/flowers', flower_controller.flower_create_post);
// DELETE request to delete Flower.
router.delete('/flowers/:id', flower_controller.flower_delete);
// PUT request to update Flower.
router.put('/flowers/:id', flower_controller.flower_update_put);
// GET request for one Flower.
router.get('/flowers/:id', flower_controller.flower_detail);
// GET request for list of all Flower items.
router.get('/flowers', flower_controller.flower_list);
module.exports = router;
