import  express  from "express";
const app = express()

app.get('/', function (req, res) {
  res.send('Hello World')
})

app.listen(8000,()=>{
    console.log("I am From 8000")
})