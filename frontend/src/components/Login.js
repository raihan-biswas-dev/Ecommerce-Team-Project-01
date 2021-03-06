import React, { useContext, useEffect, useState } from 'react'
import { Container, Form, Alert, Button } from 'react-bootstrap'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { Store } from '../Store'
import { toast } from 'react-toastify'

const Login = () => {

  const navigate = useNavigate()
  let { search, state } = useLocation()
  let redirectUrl = new URLSearchParams(search).get('redirect')
  let redirect = redirectUrl ? redirectUrl : "/"

  let [email, setEmail] = useState("")
  let [password, setPassword] = useState("")

  const { state3, dispatch3 } = useContext(Store)
  const { userInfo } = state3


  let handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const { data } = await axios.post("/api/users/signin", {
        email,
        password
      })
      // console.log(data)
      dispatch3({ type: 'USER_SIGNIN', payload: data })
      localStorage.setItem('userInfo', JSON.stringify(data))
      navigate(redirect || "/")
    } catch (err) {
      toast.error("Invalid E-mail or Password")
    }

  }

  useEffect(() => {
    if (userInfo) {
      navigate(redirect)
    }
  }, [])

  return (
    <>

      <Container className='w-25 mt-5 border loginForm p-3'>
        <Alert variant="secondary" className='text-center'>
          <h2>Login</h2>
        </Alert>



        <Form onSubmit={handleSubmit} >
          <Form.Group className="mb-3">
            <Form.Control onChange={(e) => setEmail(e.target.value)} className='signinforminpu1' type="email" placeholder="Enter email" />
          </Form.Group>

          <Form.Group className="mb-3" >
            <Form.Control onChange={(e) => setPassword(e.target.value)} className='signinforminpu2' type="password" placeholder="Password" />
          </Form.Group>
          <Button className='loginBtn' variant="primary" type="submit">
            Sign in
          </Button>
          <Form.Text>
            Not registered? <Link to={`/signup?redirect=${redirect}`}>SIgn up</Link>
          </Form.Text>
        </Form>
      </Container>
    </>
  )
}

export default Login