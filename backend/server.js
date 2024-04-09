const express =require('express')
const mongoose =require('mongoose')
const bodyParser=require('body-parser')
const UserInfo=require('./model')
const cors =require('cors')
const port=5000;
const app=express()
require('dotenv').config()
app.use(bodyParser.json())
app.use(cors())
mongoose.connect(process.env.MONGO_URI,{
useUnifiedTopology:true,
useNewUrlParser:true,
})
.then(()=>console.log("Connected to db"))
.catch((e)=>console.log("Error occured while trying to connect to db",e))

app.get('/users',async(req,res)=>{
try{
    const data = await UserInfo.find()
    res.json(data)
}
catch(e){
        console.log(e)
        res.status(500).json({message:"Internal Error occured"})
}
})
app.post('/users',async(req,res)=>{
    try{
        const {username,salary,role}=req.body
        const data=await UserInfo.create({username,salary,role})
        res.status(201).json(data)
    }
    catch(e){
        console.log(e)
    }
})
app.delete('/users/:id',async(req,res)=>{
    try{
        const {id}=req.params
        const data=await UserInfo.findByIdAndDelete(id)
        res.send({message:"User deleted successfully",data})
    }
    catch(e){
        console.log(e)
    }
})
app.put('/users/:id',async(req,res)=>{
    try{
        const {id}=req.params
        const {username,salary,role}=req.body
        await UserInfo.findByIdAndUpdate(id,{username,salary,role})
        res.send({message:"User updated successfully"})
    }
    catch(e){
        console.log(e)
    }
})
require('dotenv')
app.listen(port,()=>{
console.log(`Server started at local host ${port}`)
})