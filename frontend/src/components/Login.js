import React, { useContext, useEffect, useState } from 'react'
import { Button, Container, Form } from 'react-bootstrap'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import axios from 'axios'
import bannerData from '../bannerData'
import { Store } from '../Store'
import {toast} from 'react-toastify'

const Login = () => {

  const navigate = useNavigate()
  let {search,state} = useLocation()
  let redirectUrl = new URLSearchParams(search).get('redirect')
  let redirect = redirectUrl ? redirectUrl : "/"

  let [email,setEmail]=useState("")
  let [password,setPassword]=useState("")

  const {state3,dispatch3} = useContext(Store)
  const {userInfo} = state3


  let handleSubmit=async(e)=>{
    e.preventDefault()
    try{
      const {data} =await axios.post("/api/users/signin",{
        email,
        password
      })
      // console.log(data)
      dispatch3({type:'USER_SIGNIN',payload:data})
      localStorage.setItem('userInfo',JSON.stringify(data))
      navigate(redirect || "/")
    }catch(err){
      toast.error("Invalid E-mail or Password")
    }

  }

  useEffect(()=>{
    if(userInfo){
      navigate (redirect)
    }
  },[])

  return (
    <>
    {bannerData.map(item => (    
    <div>
      <img src={item.img}/>
  
  </div>
  ))}
      <Container>
      <Form style={{maxWidth:"600px",margin:"0 auto"}} onSubmit={handleSubmit} >
  <Form.Group className="mb-3">
    <Form.Control onChange={(e)=>setEmail(e.target.value)} className='signinforminpu1' type="email" placeholder="Enter email" />
  </Form.Group>

  <Form.Group className="mb-3" >
    <Form.Control onChange={(e)=>setPassword(e.target.value)} className='signinforminpu2' type="password" placeholder="Password" />
  </Form.Group>
  <button className='sing-button' variant="primary" type="submit">
    Sign in
  </button>
  <Form.Text>
  Not registered? <Link to={`/signup?redirect=${redirect}`}>SIgn up</Link>
  </Form.Text>
</Form>
      </Container>
    </>
  )
}

export default Login