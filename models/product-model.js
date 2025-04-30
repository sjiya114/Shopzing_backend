const mongoose=require('mongoose');
const productSchema=mongoose.Schema({
name:String,
panelcolor:String,
bgcolor:String,
textcolor:String,
price:Number,
discount:Number,
image:Buffer,
date:{
    type:Date,
    default:Date.now()
}
});
module.exports=mongoose.model("product",productSchema);