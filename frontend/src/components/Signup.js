import React, { useContext, useEffect, useState } from 'react'
import { Button, Container, Form } from 'react-bootstrap'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import axios from 'axios'
import bannerData from '../bannerData'
import { Store } from '../Store'
import { toast } from 'react-toastify'

const Signup = () => {

  const navigate = useNavigate()
  let { search } = useLocation()

  let redirectUrl = new URLSearchParams(search).get("redirect")
  let redirect = redirectUrl ? redirectUrl : "/"

  let [name,setName]=useState("")
  let [email,setEmail]=useState("")
  let [password,setPassword]=useState("")
  let [confirmpassword,setConfirmpassword]=useState("")

  
  const { state3, dispatch3 } = useContext(Store)


  const { userInfo } = state3

  let handlesignupSubmit = async (e) => {
    e.preventDefault()
    try {
        const { data } = await axios.post("/api/users/signup", {
            name,
            email,
            password
        })
        console.log(data)

        dispatch3({ type: 'USER_SIGNIN', payload: data })
        localStorage.setItem('userInfo', JSON.stringify(data))
        navigate(redirect || '/')
    } catch (err) {
        toast.error("Invalid email or pass")
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
      <Form style={{maxWidth:"600px",margin:"0 auto",marginTop:"150px"}} onSubmit={handlesignupSubmit} >

  <Form.Group className="mb-3">
    <Form.Label  >Name</Form.Label>
    <Form.Control className='signinforminpu1' onChange={(e)=>setName(e.target.value)}  type="text" placeholder="write your name" />
  </Form.Group>
  <Form.Group className="mb-3">
    <Form.Label  >Email address</Form.Label>
    <Form.Control className='signinforminpu1' onChange={(e)=>setEmail(e.target.value)}  type="email" placeholder="Enter email" />
  </Form.Group>

  <Form.Group className="mb-3">
    <Form.Label>Password</Form.Label>
    <Form.Control className='signinforminpu1' onChange={(e)=>setPassword(e.target.value)} type="password" placeholder="Password" />
  </Form.Group>
  <Form.Group className="mb-3">
    <Form.Label>Confirm Password</Form.Label>
    <Form.Control className='signinforminpu1' onChange={(e)=>setConfirmpassword(e.target.value)} type="password" placeholder="Confirm Password" />
  </Form.Group>
  <button className='sing-button' variant="primary" type="submit">
    Sign Up
  </button>
  <Form.Text>
  Already Have An Account? <Link to={`/signin?redirect=${redirect}`}>Log In</Link>
  </Form.Text>
</Form>
      </Container>
      
    </>
  )
}

export default Signup