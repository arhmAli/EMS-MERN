import {connectToDatabase}from '../../utils/mongodb'
export default async function handler(req,res){
    if(req.method=="POST"){
        await connectToDatabase;
        res.status(200).json({message:"Connected to mongodb"})
    }else{
        res.status(405).json({message:"Method not allowed"})
    }
}