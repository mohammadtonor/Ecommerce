import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import cors from 'cors';

import { dcConnect } from './config/dbConnect.js';
import authRouter from './routes/authRoute.js';
import { errorHandler, notFound } from './middleware/errorHandler.js';

dotenv.config();
const app = express(); 
const PORT = process.env.PORT || 4000;

app.use(express.json());


app.use('/api/auth', authRouter);

app.use(notFound)
app.use(errorHandler)

app.listen(PORT, () => {
    dcConnect();
    console.log(`server listening on port ${PORT}`);
})