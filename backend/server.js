import  express  from "express";
import data from "./data.js";
import discount from "./discount.js";
import dotenv from 'dotenv'
import bannerData from "./bannerData.js";
import seedRouter from "./routes/seedRouter.js";
import mongoose from "mongoose";
import userRouter from "./routes/userRouter.js";


import cors from 'cors'
const app = express()

dotenv.config()
mongoose.connect(process.env.MONGODB_URL).then(()=>{
  console.log("mongodb connected")
})
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use('/api/seed',seedRouter)
app.use('/api/users',userRouter)

app.use(cors())

app.get('/', function (req, res) {
  res.send('Hello World')
})


app.get('/banner', function (req, res) {
  res.send(bannerData)
})


app.get('/products', function (req, res) {
  res.send(data)
})


let port = process.env.PORT || 8000

app.listen(8000,()=>{
    console.log("I am From 8000")
})