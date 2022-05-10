import express from 'express'
import User from '../models/userModel.js'
import userData from '../userData.js'
import data from '../data.js'
import Product from '../models/ProductModel.js'


const seedRouter = express.Router()

seedRouter.get('/products',async(req,res)=>{
    await Product.remove({})
    console.log(data)
    const product = await Product.insertMany(data)
    res.send(product)
})

seedRouter.get('/users',async(req,res)=>{
    await User.remove({})
    const user = await User.insertMany(userData)
    res.send(user)
})


export default seedRouter