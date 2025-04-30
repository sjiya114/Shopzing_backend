const userModel=require('../models/user-model');
const jwt=require('jsonwebtoken');
module.exports.isLoggedIn=async(req,res,next)=>
{
    console.log(req.file);
    console.log("Authorization Header:", req.headers.authorization);
    const token = req.headers.authorization?.split(" ")[1];
    // console.log(token);
try{
if(!token)
        {
        req.flash("error","you need to login first");
        return res.send({message:"error"});
        }
let decoded=jwt.verify(token,process.env.JWT_KEY);
let user=await userModel.findOne({email:decoded.email}).select("-password");
req.user=user;
next();
}
catch(e)
{
    res.send(e);
}
}