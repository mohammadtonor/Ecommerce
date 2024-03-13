import express from 'express';
import { dcConnect } from './config/dbConnect.js';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import cors from 'cors';

import authRouter from './routes/authRoute.js';

dotenv.config();
const app = express(); 
const PORT = process.env.PORT || 4000;

app.use(express.json());


app.use('/api/users', authRouter);

app.listen(PORT, () => {
    dcConnect();
    console.log(`server listening on port ${PORT}`);
})