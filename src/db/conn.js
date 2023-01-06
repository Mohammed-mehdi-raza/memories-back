import mongoose from 'mongoose';
import 'dotenv/config';
const URI=process.env.MONGO_URI||mongodb+srv://dbUser:dbUserPassword@cluster0.kcwoc.mongodb.net/memories?retryWrites=true&w=majority;

mongoose.connect(URI,{
  useNewUrlParser:true,
  useUnifiedTopology:true
}).then(()=>{
  console.log("connection to database sucessfull");
}).catch((e)=>{
  console.log(`unable to connect to database due to error: ${e}`);
});
