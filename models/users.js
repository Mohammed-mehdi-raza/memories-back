import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const users = new Schema({
    name:{type:String,required:true},
    id:{type:String},
    email:{type:String,required:true},
    password:{type:String,required:true}
});

const user=mongoose.model('user',users);

export default user;