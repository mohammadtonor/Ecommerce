import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import cors from 'cors';

import { dcConnect } from './config/dbConnect.js';
import { errorHandler, notFound } from './middleware/errorHandler.js';
import authRouter from './routes/authRoute.js';
import userRouter from './routes/userRoute.js';

dotenv.config();
const app = express(); 
const PORT = process.env.PORT || 4000;

app.use(express.json());


app.use('/api/auth', authRouter);
app.use('/api/users', userRouter);

app.use(notFound)
app.use(errorHandler)

app.listen(PORT, () => {
    dcConnect();
    console.log(`server listening on port ${PORT}`);
})