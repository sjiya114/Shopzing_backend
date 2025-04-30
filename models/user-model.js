const mongoose=require('mongoose');
const productModel = require('./product-model');
const userSchema=mongoose.Schema({
name:String,
password:String,
email:String,
cart:[
{
    type:mongoose.Schema.ObjectId,
    ref:productModel
}],
favourites:
[{
type:mongoose.Schema.ObjectId,
ref:productModel
}
],
orders:[
    {
        type:mongoose.Schema.ObjectId,
        ref:productModel
    }],
Profile:Buffer,
contact:Number,
});
module.exports=mongoose.model("user",userSchema);