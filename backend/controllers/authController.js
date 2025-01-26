import User from '../models/User.js';
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv';

dotenv.config();

const login = async(req,res)=>{

    try{
        const {email,password} = req.body;
        const user = await User.findOne({email})
        if(!user){
         return res.status(400).json({success:false,error:"user not found"});
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if(!isMatch){
          return res.status(400).json({success:false,error:"Wrong Password"});
        }
       
        const token  = jwt.sign({_id: user._id, role:user.role}, process.env.JWT_KEY,{expiresIn:"10d"})
       return  res.status(200).json({success:true,token,user:{_id:user._id,name:user.name,role:user.role}})

    } 
    catch(err){
      return res.status(500).json({success:false, message:err.message})
    }
}

const verify = (req,res)=>{
  return res.status(200).json({success:true, user:req.user})
}

export {login,verify};