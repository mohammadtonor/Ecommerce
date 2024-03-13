import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';

dotenv.config();

const app = express(); 

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log(`server listening on port ${PORT}`);
})