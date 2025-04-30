const mongoose=require('mongoose');
// const config=require('config');
// const dbgr=require("debug")("development:mongoose");
// mongoose.connect(`${config.get("MONGODB_URI")}/shopZing`);
const connectDB = async () => {
    await mongoose.connect(process.env.MONGODB_URI).then(() => console.log("Database Connected"));
}
module.exports=connectDB;