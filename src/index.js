import express from "express";
import cors from "cors";
import './db/conn.js';
import PostRoutes from '../routes/posts.js';
import userRoutes from '../routes/users.js';
import 'dotenv/config';

const app=express();

app.use(cors());
app.use(express.json({limit:'50mb'}));
app.use(express.urlencoded({extended:false,limit:'50mb'}));
const PORT=process.env.PORT||5000;

app.use('/posts',PostRoutes);
app.use('/users',userRoutes);

app.listen(PORT,()=>{
  console.log(`server running on port : ${PORT}`);
});
