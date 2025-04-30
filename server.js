const express=require('express');
require("dotenv").config();
const app=express();
const path=require('path');
const cors=require('cors');
// const cookieParser=require('cookie-parser');
const db=require('./config/mongoose-config');
const ownerRouter=require('./routes/ownerRouter');
const productRouter=require('./routes/productRouter');
const userRouter=require('./routes/userRouter')
const index=require('./routes/index');
const authController = require('./controller/authController');
app.use(express.json());
app.use(express.urlencoded({
    extended:true
}));
app.use(cors());
//    ({ origin: 'http://localhost:5173',  // Allow frontend to call this backend
//     methods: ['GET', 'POST'],        // Allow GET/POST requests
//     credentials: true,               // Allow cookies if needed
//   }));
// app.use(expressSession({
//     resave: false,
//     saveUninitialized: true,
//     secret: 'keyboard cat'
//   }));
db();
// app.use(cookieParser());
// app.use(flash());
app.use(express.static(path.join(__dirname,"public")));
app.use("/owner",ownerRouter);
app.use("/user",userRouter);
app.use("/product",productRouter);
app.use("/index",index);
console.log("server start running at: http://localhost:5000/user/login");
app.listen(5000);



