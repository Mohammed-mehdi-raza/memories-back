import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import user from '../models/users.js';

const secret='test';

export const signIn =async(req,res)=>{
    const {email,password}=req.body;
    try {
        const existingUser =await user.findOne({email});

        if(!existingUser) res.status(404).json({messagge:'user does not exist'});

        const isPasswordCorrect =await bcrypt.compare(password,existingUser.password);

        if(!isPasswordCorrect) res.status(400).json({message:'Invalid Credentials'});

        const token = jwt.sign({email:existingUser.email,id:existingUser._id} , secret ,{expiresIn:"1h"});

        res.status(200).json({result:existingUser,token});

    } catch (error) {
        res.status(400).json({message:error});
    }
}

export const signUp =async(req,res)=>{
    const {email,password,confirmPassword,FirstName,LastName}=req.body;
    try {
        const existingUser = await user.findOne({email});

        if(existingUser) res.status(404).json({messagge:'user already exist'});

        if(password !== confirmPassword) res.status(400).json({message:"password does not match"});

        const hashedPassword = await bcrypt.hash(password,12);

        const result = await user.create({email,password:hashedPassword,name:`${FirstName} ${LastName}`});

        const token = jwt.sign({email:result.email,id:result._id} , secret ,{expiresIn:"1h"});

        res.status(200).json({result,token});

    } catch (error) {
        console.log(error);
        res.status(200).json({message:error});
    }
}