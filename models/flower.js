const mongoose = require("mongoose")
const flowerSchema = mongoose.Schema({
    flowerName: String,
    flowerCost: {type: Number,required:true,min:0,max:100},
    Description: String,
})
module.exports = mongoose.model("flower",flowerSchema)