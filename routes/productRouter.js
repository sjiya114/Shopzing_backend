const express = require('express');
const router = express.Router();
const multerConfig = require('../config/multer-config');
const productModel =require('../models/product-model');
router.post("/create", multerConfig.single("image"), async (req, res) => {
    let price=Number (req.body.price);
    let discount=Number (req.body.discount);
    try {
        
        let { name, bgcolor, panelcolor, textcolor } = req.body;
        console.log(req.body.name);
        let image = req.file.buffer;
       
        try{
        let product = await productModel.create({
            image, name,price,discount, bgcolor, panelcolor, textcolor
        });
        console.log("✅ Product created:", product);
        return res.json({success:true,product});
    }
    catch(e)
    {
        console.log(e+" "+"error while creating user");
    }
        
      
    }
    catch (e) {
        res.send(e);
    }
});
module.exports = router;