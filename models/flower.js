const mongoose = require("mongoose")
const flowerSchema = mongoose.Schema({
    flowerName: String,
    flowerCost: Number,
    Description: String,
})
module.exports = mongoose.model("flower",
flowerSchema)