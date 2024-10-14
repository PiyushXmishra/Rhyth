
import cors from 'cors';
import dotenv from 'dotenv';
import userRoutes from './routes/userRoutes'; 
import playlistRoutes from './routes/playlistRoutes'
import songRoutes from './routes/songRoutes'
import express, { Express,Request, Response } from 'express';


dotenv.config();
const app:Express = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use('/api/users', userRoutes);
app.use('/api/songs' , songRoutes);
app.use('/api/playlist' , playlistRoutes)

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
