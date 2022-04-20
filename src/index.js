import express from "express";
import cors from "cors";
import './db/conn.js';
import PostRoutes from '../routes/posts.js';
import 'dotenv/config';

const app=express();
// const corsOptions={
//   origin:"http://localhost:3000",
//   credentials:true,
//   optionSuccessStatus:200
// }
app.use(cors());
app.use(express.json({limit:'50mb'}));
app.use(express.urlencoded({extended:false,limit:'50mb'}));
const PORT=process.env.port||5000;

app.use('/posts',PostRoutes);

app.get('/',(req,res)=>{
  res.send("okay");
})

app.listen(PORT,()=>{
  console.log(`server running on port : ${PORT}`);
});
