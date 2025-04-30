const express = require('express');
const { isLoggedIn } = require('../middleware/IsLoggedIn');
const userModel = require('../models/user-model');
const multerConfig=require('../config/multer-config');
const router = express.Router();
const jwt=require('jsonwebtoken');
const { login, register } = require('../controller/authController');
router.post("/login",login);
router.post("/signup",register);
router.get("/removefromcart/:productid",isLoggedIn,async(req,res)=>
{
let user=await userModel.findOne({email:req.user.email});
user.cart.remove(req.params.productid);
await user.save();
return res.json({success:true})
// res.redirect("/user/cart");
});
router.get("/addtocart/favourites/:productid",isLoggedIn,async(req, res) => {
    let user=await userModel.findOne({email:req.user.email});
    user.cart.push(req.params.productid);
    await user.save();
    res.json({success:true});
    // res.redirect("/index/favourites");
});
router.get("/addtocart/:productid",isLoggedIn,async(req, res) => {
    let user=await userModel.findOne({email:req.user.email});
    user.cart.push(req.params.productid);
    await user.save();
    return res.json({success:true,message:"added to cart successfully"})
    // res.redirect("/index/products");
});
router.get("/cart",isLoggedIn,async(req, res) => {
    console.log("hello");
    let prod=await userModel.findOne({email:req.user.email}).populate("cart");
    // prod.cart=prod.cart.map(p => ({
    //     _id: p._id,
    //     name: p.name,
    //     price: p.price,
    //     discount: p.discount,
    //     panelcolor: p.panelcolor,
    //     bgcolor: p.bgcolor,
    //     textcolor: p.textcolor,
    //     date: p.date,
    //     image: p.image ? p.image.toString('base64') : null, // convert buffer to base64
    //   }));
    let bill=20;
    let amount=0;
    let discount=0;
     prod.cart.forEach(function(products){
      amount+=products.price;
      discount+=products.discount;
     });
     bill=bill+amount-discount;
     return res.json({success:true,product:prod,bill:bill,discount:discount,amount:amount})
    // res.render("cart",{prod,bill,amount,discount});
});
router.post('/addimage',isLoggedIn,multerConfig.single("image"),async(req,res)=>
    {
        try{
        // // let decoded=jwt.verify(req.cookies.token,process.env.JWT_KEY);
        // let user=await userModel.findOne({email:decoded.email}).select("-password");
        let image=req.file.buffer;
        req.user.Profile=image;
        req.user.save();
        console.log("successfully added profile picture");
        res.json({success:true});
        // res.redirect("/user/profile");
        }
        catch(e)
        {
            res.send(e);
        }
        });
router.get('/profile',isLoggedIn,async(req,res)=>
    {
      let user=await userModel.findOne({email:req.user.email});
    //   res.render("profile",{user});
    });
    router.get("/addtofavourites/:productid",isLoggedIn,async(req,res)=>
    {
    let user=await userModel.findOne({email:req.user.email});
    user.favourites.push(req.params.productid);
    await user.save();
    // res.redirect("/index/products");
    });
module.exports = router;

