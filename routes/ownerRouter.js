const express=require('express');
const router=express.Router();
const {ownerlogin, createowner}=require('../controller/authController')
const ownerModel = require('../models/owner-model');
const productModel = require('../models/product-model');
const userModel = require('../models/user-model');
router.post("/create",createowner);
router.get("/productinformation",async(req,res)=>
{
    const users=await userModel.find().populate("orders");
    // res.render("details",{users});
})
router.post("/signup",ownerlogin);
router.get("/allproducts",async(req,res)=>
{
let prod=await productModel.find();
// res.render("adminproduct",{prod});
});
router.get("/remove/:id",async(req,res)=>{
let prod=await productModel.findOneAndDelete({_id:req.params.id});
return res.json({success:true});
// res.redirect("/owner/allproducts");
});
router.get("/list",async(req,res)=>
{
    const list_user=await userModel.find({})
    return res.json({list_user});
})
module.exports=router;
