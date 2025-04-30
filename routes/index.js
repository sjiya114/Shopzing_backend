const express = require('express');
const router = express.Router();
const productModel=require('../models/product-model');
const { register, login,logout} = require('../controller/authController');
const { isLoggedIn } = require('../middleware/IsLoggedIn');
const userModel = require('../models/user-model');
// router.post("/register", register);
// router.post("/login", login);
router.post("/logout", logout);
router.get("/shop", isLoggedIn, (req, res) => {
    // res.render("products");

});
router.get("/favourites",isLoggedIn,async(req,res)=>
{
let prod=await req.user.populate("favourites");
res.json({success:true,products:prod});
// res.render("favourites",{prod});
});
router.get("/products",async(req, res) => {
    let products=await productModel.find({});
    // const formatted = products.map(p => ({
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
    return res.json({success:true,products:products});
});

module.exports = router;