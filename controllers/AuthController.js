const UserModel = require("../models/User")
const bcrypt=require("bcrypt")

const jwt=require("jsonwebtoken")
const signup=async (req,res)=>{
    try {
        const {name,email,password}=req.body
        const user=await UserModel.findOne({email})
        if(user){
            res.status(409).json({message:"User Already Exists",success:false})
        }
        const userModel=new UserModel({name,email,password})
        userModel.password=await bcrypt.hash(password,10)
        await userModel.save()
        res.status(201).json({message:"Siged Up Successfully",success:true})
    } catch (error) {
        res.status(500).json({message:"Internal Server Error",success:false})
    }
}
const login=async (req,res)=>{
    try {
        const {email,password}=req.body
        const user=await UserModel.findOne({email})
        if(!user){
            res.status(403).json({message:"User does not exist .. please Signup first!",success:false})
        }
        const isPass=await bcrypt.compare(password,user.password)
        if(!isPass){
            return res.status(403).json({message:"Email or Password is Incorrect!",success:false})
        }
        const jwtToken=jwt.sign({email:user.email,_id:user._id},process.env.JWT_SECRET,{expiresIn:"24h"})
        res.status(200).json({message:"Logged In Successfully",success:true,jwtToken,email,name:user.name})
    } catch (error) {
        res.status(500).json({message:"Internal Server Error",success:false})
    }
}

module.exports={signup,login}