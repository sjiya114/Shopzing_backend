const express=require('express');
const router=express.Router();
const bcrypt=require('bcryptjs');
const userModel=require('../models/user-model');
const jwt=require('jsonwebtoken');
const { generateToken } = require('../utils/genToken');
const ownerModel = require('../models/owner-model');
module.exports.register=async(req,res)=>
{ 
    let {name,email,password}=req.body;
    try
    {
    let z=await userModel.findOne({email});
    if(z){
         return res.json({message:"user already exists"});
    }
    bcrypt.genSalt(10, function(error,salt){
    bcrypt.hash(password,salt,async function(err,hash)
    {
        if(err){
            res.send(err);
        }
         let user=await userModel.create({
            name:name,password:hash,email:email
        });
        let token=generateToken(user);
        // res.cookie("token",token);
        // res.redirect("/index/products"); 
        res.json({user:user,success:true,token:token,message:"successfully created user"});
    });
    });
}
catch(err)
{
    res.json("problem while creating user");
}
};
module.exports.login=async(req,res)=>
{
try{
    let {email,password}=req.body;
    let user=await userModel.findOne({email:email});
    if(user)
    {
        let result=await bcrypt.compare(password,user.password);
        if(result){
            let token=generateToken(user);
            // res.cookie("token",token);
            // console.log(user);
            // res.redirect("/index/products")
            return res.json({token:token,success:true,user:user});
            //res.send("successfully logged in");
        }
        else
        {
        return res.status(400).json({success:false});
        }
    }
}
catch(err)
{
    // res.send("error while signing in please try again later");
    return res.status(400).json({success:false});
}
};
module.exports.logout=(req,res)=>
{
res.clearCookie("token");
// res.redirect("/user/login");
};

module.exports.ownerlogin=async(req,res)=>
    {
    try{
        let {email,password}=req.body;
        let user=await ownerModel.findOne({email:email});
        if(user)
        {
            let result=await bcrypt.compare(password,user.password);
            if(result){
                let token=generateToken(user);
                res.cookie("token",token);
                // res.redirect("/owner/products")
                //res.send("successfully logged in");
            }
            else
            {
            res.json("incorrect email or password");
            }
        }
    }
    catch(err)
    {
        res.json("error while signing in please try again later");
    }
    };
    module.exports.createowner=async(req,res)=>
        {
            try
            {
            let {name,email,password}=req.body;
            let z=await ownerModel.findOne({email});
            if(z){
                 res.json("error");
            }
            bcrypt.genSalt(10, function(error,salt){
            bcrypt.hash(password,salt,async function(err,hash)
            {
                if(err)
                    res.send(err);
                 let user=await ownerModel.create({
                    name:name,password:hash,email:email
                });
                let token=generateToken(user);
                console.log(user);
                // res.cookie("token",token);
                res.json(user);  
            });
            });
        }
        catch(err)
        {
            res.json("problem while creating user");
        }
        };

module.exports.authUser=async(req,res)=>
{
    return res.json({success:true,user:req.user});
}
