import  express  from "express";
import data from "./data.js";
import cors from 'cors'
const app = express()


app.use(cors())

app.get('/', function (req, res) {
  res.send('Hello World')
})


app.get('/products', function (req, res) {
  res.send(data)
})


let port = process.env.PORT || 8000

app.listen(8000,()=>{
    console.log("I am From 8000")
})