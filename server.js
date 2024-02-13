import "colors";
import cors from "cors";
import express from "express";
import dotenv from "dotenv";
import morgan from "morgan"; 
import ConnectDB from "./config/db.js";
import authRoute from "./routes/authRoute.js"
import postRoute from "./routes/postRoute.js"

dotenv.config();
ConnectDB();

const app = express();

app.use(cors())
app.use(express.json())
app.use(morgan('dev'))

app.use('/api/v1/auth', authRoute)
app.use('/api/v1/posts', postRoute)

// app.get('/', (req, res)=>{res.send("<h1>WELCOME</h1>")})
app.listen(process.env.PORT, ()=>{console.log(`Server Running on PORT:${process.env.PORT}`.bgCyan.white)})