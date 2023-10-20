const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const reviewSchema = new Schema({
    productId: {type:String, required:true},
    rating: {type:Number, required:true},
    subject: {type: String},
    message: {type: String},
    updatedAT: {type:Date, default:Date.now},
    createdAT: {type:Date, required: true},
});

module.exports= mongoose.model("review", reviewSchema);