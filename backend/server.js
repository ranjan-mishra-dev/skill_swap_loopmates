// server.js
import express from 'express'
import cors from "cors"
import 'dotenv/config'
import connectDB from './config/mongodb.js' 
import connectCloudinary from './config/cloudinary.js'
// import adminRouter from './routes/adminRoute.js'
// import doctorRouter from './routes/doctorRoute.js'
import userRouter from './routes/userRoute.js'

const PORT = process.env.PORT || 3000;

//app config
const app = express()
connectDB()
connectCloudinary()


//middlewares
app.use(express.json())
app.use(cors())


app.get('/', (req, res) => {
  res.send('Hello, World!');
});


app.use('/api/users', userRouter)


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
