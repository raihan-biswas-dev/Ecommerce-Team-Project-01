import React, { useContext } from 'react'
import { Alert, Button, Col, Container, Dropdown, ListGroup, Row } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { Store } from '../Store'
import { ImCross } from 'react-icons/im';


const CartPage = () => {

    let navigate =useNavigate()
  const {state,dispatch} = useContext(Store)
  const {cart:{cartItems}} = state

  let updateCart=(item,quantity)=>{
    dispatch({
        type:'CART_ADD_ITEM',
        payload:{...item,quantity}
    })
}

let handleRemoveItem=(item)=>{
  dispatch({
      type:'CART_REMOVE_ITEM',
      payload:item
  })
}

let handleCheckOut=()=>{
  navigate('/signin?redirect=/shipping')
}


  return (
    <Container>
    <Row style={{marginTop:"80px"}}>
      <Col lg={12}>
        {cartItems.length ===0 
        ? 
        <Alert variant='danger'>
          Cart Is Empty
      </Alert>
      :
      <ListGroup variant="flush">
        <Row style={{background:"#fff",border:"1px solid #edeef2",height:"40px",}}>
        <Col style={{marginTop:"7px",}} lg={2}>Product</Col>
        <Col style={{marginTop:"7px"}} lg={2}>Name</Col>
        <Col style={{marginTop:"7px",textAlign:"center"}} lg={2}>Unit Price</Col>
        <Col style={{marginTop:"7px",textAlign:"center"}} lg={4}>Quantity</Col>
        <Col style={{marginTop:"7px"}} lg={1}>Total</Col>
        <Col style={{marginTop:"7px"}} lg={1}>Delete</Col>
        </Row>
  {cartItems.map((item)=>(
    <ListGroup.Item style={{marginTop:"20px"}}>
      
    <Row>
      <Col style={{marginLeft:"-15px"}}lg={1}>
        <img src={item.img} style={{width:"80px"}}/>
      </Col>
      <Col style={{textAlign:"center"}}  lg={3}>
      <Link style={{color:"#333"}} to={`/products/${item.slug}`}>{item.name}</Link>
      
      </Col>
      <Col style={{textAlign:"center"}}  lg={2}>
      <a>$ {item.price}</a>
      </Col>
      <Col style={{textAlign:"center",marginLeft:"10px"}} lg={4}>
      <Button variant="light" className='minusbtn' onClick={()=>updateCart(item,item.quantity-1)} disabled={item.quantity === 1}>-</Button>
      <span>{item.quantity}</span>
      <Button variant="light" className='plusbtn' onClick={()=>updateCart(item,item.quantity+1)}  disabled={item.quantity == item.instock}>+</Button>
      </Col>
      <Col style={{textAlign:"center"}}  lg={1}>
      <a className='dlticn'>{item.quantity}</a>
      </Col>
      <Col style={{textAlign:"center"}} lg={1}>
      <a onClick={()=>handleRemoveItem(item)} className='dlticn'><ImCross/></a>
      </Col>
    </Row>
  </ListGroup.Item>
  ))}
</ListGroup>


      }
      </Col>
<div class="row">
                     <div class="col-md-5 ml-auto">
                        <div class="cart-page-total">
                           <h2>Cart totals</h2>
                           <ul class="mb-20">
                              <li>Subtotal <span>${cartItems.reduce((accumulator,current)=>accumulator + current.price * current.quantity, 0)}</span></li>
                              <li>Total <span>${cartItems.reduce((accumulator,current)=>accumulator + current.price * current.quantity, 0)}</span></li>
                           </ul>
                           <a class="border-btn">Proceed to checkout</a>
                        </div>
                     </div>
                  </div>
    </Row>
    </Container>
  )
}

export default CartPage