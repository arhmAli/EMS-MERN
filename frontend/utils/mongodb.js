import mongoose from "mongoose";
const connectToDatabase=async()=>{
try{
    const uri=process.env.MONGO_URI
    const options={
        useNewUrlParser:true,
        useUnifiedTopology:true,
    }
    await mongoose.connect(uri,options);
    console.log("Connected to db")
}
catch(e){
    console.log(e.message)
}
}