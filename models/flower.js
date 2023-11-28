const mongoose = require("mongoose")
const flowerSchema = mongoose.Schema({
    flowerName: {type:String,required:true},
    flowerCost: {type: Number,required:true,min:0,max:100},
    Description: {type:String,required:true},
})
module.exports = mongoose.model("flower",flowerSchema)