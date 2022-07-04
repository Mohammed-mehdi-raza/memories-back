import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const postMessages =new Schema({
  title:String,
  message:String,
  name:String,
  creator:String,
  tags:[String],
  selectedFile:String,
  likes:{
    type:[String],
    default:[]
  },
  createdAt:{
    type:Date,
    default:new Date()
  }
});

const postMessage=mongoose.model('postMessage',postMessages);

export default postMessage;