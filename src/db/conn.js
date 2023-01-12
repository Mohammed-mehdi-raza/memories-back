import mongoose from 'mongoose';
import 'dotenv/config';
const URI=process.env.MONGO_URI;

mongoose.set('strictQuery', false);

mongoose.connect(URI,{
  useNewUrlParser:true,
  useUnifiedTopology:true
}).then(()=>{
  console.log("connection to database sucessfull");
}).catch((e)=>{
  console.log(`unable to connect to database due to error: ${e}`);
});