import express from "express";
import data from "./data.js";
import mongoose from "mongoose";
import dotenv from 'dotenv'
import seedRouter from "./routes/seedRouter.js";
import userRouter from "./routes/userRouter.js";
import productRouter from "./routes/productRouter.js";
import cors from 'cors'


const app = express()

dotenv.config()

mongoose.connect(process.env.MONGODB_URL).then(() => {
  console.log("mongodb connected")
})
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/api/products', productRouter)
app.use('/api/seed', seedRouter)
app.use('/api/users', userRouter)

app.use(cors())




// app.get('/', function (req, res) {
//   res.send('Hello World')
// })


// app.get('/products', function (req, res) {
//   res.send(data)
// })



app.get('/products/:slug', function (req, res) {
  let product = data.find((item) => {
    if (item.slug == req.params.slug) {
      return item
    }
  })
  res.send(product)
})

app.get("/cartproduct/:id",function(req,res){
  let product= data.find((item)=>{
      if(req.params.id == item._id){
         return item
      }
    })
    res.send(product)
  //   console.log(product)
})



let port = process.env.PORT || 8000

app.listen(8000, () => {
  console.log("I am From 8000")
})