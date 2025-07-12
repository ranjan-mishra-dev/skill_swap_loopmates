// server.js
import express from 'express'
import cors from "cors"
import 'dotenv/config'
import connectDB from './config/mongodb.js' 
import connectCloudinary from './config/cloudinary.js'
import swapRoutes from "./routes/swapRoutes.js";

import userRouter from './routes/userRoute.js'

const PORT = process.env.PORT || 3000;

//app config
const app = express()
connectDB()
connectCloudinary()


//middlewares
// app.use(cors()
app.use(cors({
  origin: 'http://localhost:5173', // frontend URL
  credentials: true // if you're sending cookies or auth headers
}));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));


app.get('/', (req, res) => {
  res.send('Hello, World!');
});


app.use('/api/users', userRouter)
app.use("/api/swaps", swapRoutes);
// app.use("/api/get-all", swapRoutes);
// router.get("/api/", userRouter);




app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
