const mongoose=require('mongoose')
const Schema=mongoose.Schema;

const EmployeeSchema=new Schema({
    username:String,
    salary:Number,
    role:String
})
const EmployeeInfo=mongoose.model("Employeedata",EmployeeSchema)
module.exports=EmployeeInfo