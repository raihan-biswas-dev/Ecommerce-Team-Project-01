import express from "express";
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



app.get('/products/:slug', function (req, res) {
  let product = data.find((item) => {
    // console.log("Frontend", req.params.slug)
    // console.log("Backend", item.slug)

    if (item.slug == req.params.slug) {
      return item
    }
  })
  res.send(product)
})


let port = process.env.PORT || 8000

app.listen(8000, () => {
  console.log("I am From 8000")
})