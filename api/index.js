import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import morgan from "morgan";
import path from 'path';

import { dcConnect } from './config/dbConnect.js';
import { errorHandler, notFound } from './middleware/errorHandler.js';
import authRouter from './routes/authRoute.js';
import userRouter from './routes/userRoute.js';
import productRouter from './routes/productRoute.js';
import blogRouter from './routes/blogRoute.js';
import categoryRouter from './routes/categoryroute.js';
import blogCatRouter from './routes/blogCatRoute.js';
import BrandRoute from './routes/brandRoute.js';
import colorRoute from './routes/colorRoute.js';
import couponRoute from './routes/couponRoute.js';
import orderRoute from './routes/orderRoute.js';
import enqRoute from './routes/enqRoute.js';
import { fileURLToPath } from 'url';

dotenv.config();
const app = express(); 
const PORT = process.env.PORT || 4000;

const __dirname = path.resolve();


app.use(morgan("dev"));

app.use(express.json());
app.use(cookieParser());

app.use(express.static(path.join(__dirname, "../client/build")));


app.use('/api/auth', authRouter);
app.use('/api/users', userRouter);
app.use('/api/products', productRouter);
app.use('/api/blogs', blogRouter);
app.use('/api/categories', categoryRouter);
app.use('/api/blogCatategory', blogCatRouter);
app.use('/api/brands', BrandRoute);
app.use('/api/colors', colorRoute);
app.use('/api/coupons', couponRoute);
app.use('/api/orders', orderRoute);
app.use('/api/enquiry', enqRoute);

app.use(notFound)
app.use(errorHandler)

app.get("*", (req , res ) => {
    res.sendFile(path.join(__dirname, "../client/build/index.html"))
});

app.listen(PORT, () => {
    dcConnect();
    console.log(`server listening on port ${PORT}`);
})