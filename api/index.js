import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import morgan from "morgan";

import { dcConnect } from './config/dbConnect.js';
import { errorHandler, notFound } from './middleware/errorHandler.js';
import authRouter from './routes/authRoute.js';
import userRouter from './routes/userRoute.js';
import productRouter from './routes/productRoute.js';
import blogRouter from './routes/blogRoute.js';
import categoryRouter from './routes/categoryroute.js';
import blogCatRouter from './routes/blogCatRoute.js';
import BrandRoute from './routes/brandRoute.js';

dotenv.config();
const app = express(); 
const PORT = process.env.PORT || 4000;

app.use(morgan("dev"));

app.use(express.json());
app.use(cookieParser());

app.use('/api/auth', authRouter);
app.use('/api/users', userRouter);
app.use('/api/products', productRouter);
app.use('/api/blogs', blogRouter);
app.use('/api/categories', categoryRouter);
app.use('/api/blogCatategory', blogCatRouter);
app.use('/api/brands', BrandRoute);

app.use(notFound)
app.use(errorHandler)

app.listen(PORT, () => {
    dcConnect();
    console.log(`server listening on port ${PORT}`);
})