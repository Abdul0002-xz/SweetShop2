import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv'
import morgan from 'morgan';

dotenv.config({
    path:"./.env"
})

const app = express()



app.use(cors({
    origin : process.env.CORS_ORIGIN,
    credentials : true,
    methods: ['GET', 'POST', 'PUT', 'DELETE']
}))
app.use(morgan("dev"))
app.use(express.json({limit:"500gb"}))
app.use(express.urlencoded({extended:true, limit:"500gb"})) 
app.use(express.static("public"))
app.use(cookieParser())


import userRoutes from './routes/user.routes.js';
import sweetRoutes from './routes/sweets.routes.js';

app.use('/api/v1/users', userRoutes);
app.use('/api/sweets', sweetRoutes);



export default app;