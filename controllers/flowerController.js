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


// for a specific Costume.
exports.flower_detail = async function(req, res) {
    console.log("detail" + req.params.id)
    try {
    result = await flower.findById( req.params.id)
    res.send(result)
    } catch (error) {
    res.status(500)
    res.send(`{"error": document for id ${req.params.id} not found`);
    }
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
// Handle Costume delete on DELETE.
exports.flower_delete = async function(req, res) {
console.log("delete " + req.params.id)
try {
result = await flower.findByIdAndDelete( req.params.id)
console.log("Removed " + result)
res.send(result)
} catch (err) {
res.status(500)
res.send(`{"error": Error deleting ${err}}`);
}
};


// Handle Flower update form on PUT.
exports.flower_update_put = async function(req, res) {
console.log(`update on id ${req.params.id} with body
${JSON.stringify(req.body)}`)
try {
let toUpdate = await flower.findById( req.params.id)
// Do updates of properties
if(req.body.flowerName)
toUpdate.flowerName = req.body.flowerName;
if(req.body.flowerCost) toUpdate.flowerCost = req.body.flowerCost;
if(req.body.Description) toUpdate.Description = req.body.Description;
let result = await toUpdate.save();
console.log("Sucess " + result)
res.send(result)
} catch (err) {
res.status(500)
res.send(`{"error": ${err}: Update for id ${req.params.id}
failed`);
}
};
