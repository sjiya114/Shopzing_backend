const mongoose=require('mongoose');
const ownerSchema=mongoose.Schema({
name:String,
password:String,
email:String,
products:{
    type:Array,
    default:[]
},
Profile:String,
contact:Number
});
module.exports=mongoose.model("owner",ownerSchema);