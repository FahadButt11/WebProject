const mongoose= require("mongoose");

const schema= mongoose.Schema({
    title:String,
    tag:[String],
    price:Number
});

const productModel= mongoose.model("Product",schema);

module.exports=productModel;
