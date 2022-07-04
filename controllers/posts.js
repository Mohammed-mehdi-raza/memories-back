import mongoose from 'mongoose';
import postMessage from '../models/postMessages.js';

export const getPosts=async(req,res)=>{
  try{
    const message=await postMessage.find();
    res.status(201).json(message);
  }
  catch(error){
    res.status(409).json({message:error.message});
  }
}

export const createPosts=async(req,res)=>{
  const post=req.body;
  console.log(req.body);
  const newPost=new postMessage({...post,creator:req.userId,createdAt:new Date()});

  try{
    await newPost.save();
    res.status(200).json(newPost);
  }
  catch(error){
    res.status(409).json({message:error.message});
  }
}

export const updatePost=async(req,res)=>{
  const _id=req.params.id;
  const post=req.body;

  if(!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).send('given id is not valid');

  try {
    const updatePost =await postMessage.findByIdAndUpdate(_id,post,{new:true});
    console.log(post);
    //res.headers.add('Access-Control-Allow-Origin','*');
    res.status(200).json(updatePost);
  } catch (error) {
    console.log(error);
  }
}

export const deletePost =async(req,res)=>{
  const id=req.params.id;
  if(!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send('given id is not valid');
  
  try {
    await postMessage.findByIdAndRemove(id);
    res.status(200).json({message:"post deleted sucessfully"});
  } catch (error) {
    console.log(error);
  }
}

export const likePost=async(req,res)=>{
  const id= req.params.id;
  if(!req.userId) res.status(400).json({message:'unathorized'});
  if(!mongoose.Types.ObjectId.isValid(id))
    res.status(404).send('given id is not valid');

  try {
    const post =await postMessage.findById(id);
    const index = post.likes.findIndex((id)=>id===String(req.userId));
    if(index===-1){
      post.likes.push(req.userId);
    } else {
      post.likes=post.likes.filter((id)=>id!=String(req.userId));
    }
    const likePost=await postMessage.findByIdAndUpdate(id,post,{new:true});
    res.status(200).json(likePost);
  } catch (error) {
    console.log(error);
  }
}