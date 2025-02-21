import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import userRoutes from './routes/userRoutes'; 
import playlistRoutes from './routes/playlistRoutes'
import songRoutes from './routes/songRoutes'
import express, { Express,Request, Response } from 'express';


dotenv.config();
const app:Express = express();
const PORT = process.env.PORT || 4000;
const allowedOrigins = ['http://localhost:3000','https://localhost:3000','https://rhyth.vercel.app', 'https://rhyth.tech'] ;
app.use(cors({
    origin: allowedOrigins,
    credentials: true,  // Allow cookies to be sent with requests
  }));
app.use(cookieParser());
app.use(express.json());

app.get("/",(req,res)=>{
  res.status(200);
  res.send("hello from rhyth")
})

app.use('/api/users', userRoutes);
app.use('/api/songs' , songRoutes);
app.use('/api/playlist' , playlistRoutes)

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
