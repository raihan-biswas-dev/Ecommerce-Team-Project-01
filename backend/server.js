import  express  from "express";
import data from "./data.js";
const app = express()

app.get('/', function (req, res) {
  res.send('Hello World')
})


app.get('/products', function (req, res) {
  res.send(data)
})


let port = process.env.PORT || 8000

app.listen(port,()=>{
    console.log("I am From 8000")
})