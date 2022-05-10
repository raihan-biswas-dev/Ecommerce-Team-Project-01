import express from 'express'
import User from '../models/userModel.js'
import userData from '../userData.js'


const seedRouter = express.Router()

seedRouter.get('/',async(req,res)=>{
    await User.remove({})
    const user = await User.insertMany(userData)
    res.send(user)
})


export default seedRouter