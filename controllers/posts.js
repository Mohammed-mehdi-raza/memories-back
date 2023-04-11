import mongoose from 'mongoose';
import postMessage from '../models/postMessages.js';

export const getPosts=async(req,res)=>{

  const {page}=req.query;

  try{
    const LIMIT=6;
    const startIndex=(Number(page)-1)*LIMIT;
    const total=await postMessage.countDocuments({});
    const posts=await postMessage.find().sort({_id:-1}).limit(LIMIT).skip(startIndex);
    res.status(201).json({data:posts,currentPage:page,numberOfPages:Math.ceil(total/LIMIT)});
  }
  catch(error){
    res.status(409).json({message:error.message});
  }
}

export const getPost=async(req,res)=>{
  const id = req.params.id;
  try{
    const post = await postMessage.findById(id);
    res.status(200).json(post);
  }catch(e){
    res.status(202).json({message:e.message});
  }
}

export const getPostsBySearch=async(req,res)=>{

  const {searchQuery,tags}=req.query;

  try {
    const title=new RegExp(searchQuery,"i");
    const posts=await postMessage.find({ $or: [ {title} ,{tags: {$in:tags.split(",")}} ] });
    res.status(200).json({data:posts});
  } catch (error) {
    res.status(409).json({message:error.message});
  }
}

export const createPosts=async(req,res)=>{
  const post=req.body;
  const newPost=new postMessage({...post,creator:req.userId,createdAt:new Date()});

  try{
    console.log(newPost);
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