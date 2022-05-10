import express from "express";
import bcrypt from "bcryptjs"
import {generateToken} from "../utils.js"
import User from "../models/userModel.js";


const userRouter = express.Router()


userRouter.post('/signin',async(req,res)=>{  
    let user = await User.findOne({email:req.body.email})
    console.log(user)
    
    if(user){
        if(bcrypt.compareSync(req.body.password, user.password)){
            res.send({
                _id: user._id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin,
                token : generateToken(user)
            })
            return
        }
    }
    res.status(401).send({msg:"Invalid E-mail or Password"})
    
  })

  userRouter.post('/signup',async(req,res)=>{  
    const newUser = new User({
        name : req.body.name,
        email:req.body.email,
        password:bcrypt.hashSync(req.body.password)
    })
    const user = await newUser.save()

    res.send({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        token : generateToken(user)
    })
  })
  

  export default userRouter