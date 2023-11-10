var flower = require('../models/flower');
// List of all flowers
// List of all flowers
exports.flower_list = async function (req, res) {
    try {
        theflowers = await flower.find();
        res.send(theflowers);
    }
    catch (err) {
        res.status(500);
        res.send(`{"error": ${err}}`);
    }
};
// VIEWS
// Handle a show all view
exports.flower_view_all_Page = async function (req, res) {
    try {
        theflowers = await flower.find();
        res.render('flowers', { title: 'flower Search Results', results: theflowers });
    }
    catch (err) {
        res.status(500);
        res.send(`{"error": ${err}}`);
    }
};


// for a specific flower.
exports.flower_detail = function (req, res) {
    res.send('NOT IMPLEMENTED: flower detail: ' + req.params.id);
};
// Handle flower create on POST.
// Handle flower create on POST.
exports.flower_create_post = async function (req, res) {
    console.log(req.body)
    let document = new flower();
    // We are looking for a body, since POST does not have query parameters.
    // Even though bodies can be in many different formats, we will be picky
    // and require that it be a json object
    // {"flowerName":"Rose", "flowerCost":$10, "Description":"Roses are red"}
    document.flowerName = req.body.flowerName;
    document.flowerCost = req.body.flowerCost;
    document.Description = req.body.Description;
    try {
        let result = await document.save();
        res.send(result);
    }
    catch (err) {
        res.status(500);
        res.send(`{"error": ${err}}`);
    }
};

// Handle flower delete form on DELETE.
exports.flower_delete = function (req, res) {
    res.send('NOT IMPLEMENTED: flower delete DELETE ' + req.params.id);
};
// Handle flower update form on PUT.
exports.flower_update_put = function (req, res) {
    res.send('NOT IMPLEMENTED: flower update PUT' + req.params.id);
};
