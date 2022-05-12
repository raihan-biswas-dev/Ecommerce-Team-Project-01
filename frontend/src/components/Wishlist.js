import axios from 'axios'
import React, { useContext, useReducer } from 'react'
import { Container,Row,Col,Alert,ListGroup, Button } from 'react-bootstrap'
import { Helmet } from 'react-helmet-async'
import { FaShoppingCart , FaTrash } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom'
import { Store } from '../Store'



const WishList = () => {
    const { state, dispatch: ctxDispatch } = useContext(Store)
    const { cart } = state

    let navigate = useNavigate()

    const {state2,dispatch2}= useContext(Store)

    const {wishlist:{wishlistItems}}= state2

    let updatewishlist=(item,quantity)=>{
        dispatch2({
            type:'WISHLIST_ADD_ITEM',
            payload:{...item}
        })
    }


    let handleRemoveItem=(item)=>{
        dispatch2({
            type:'WISHLIST_REMOVE_ITEM',
            payload:item
        })
    }


    
    let handleAddToCart = async (product) => {

        console.log(product)
        const existingItem = cart.cartItems.find((item) => item._id === product._id);
        const quantity = existingItem ? existingItem.quantity + 1 : 1;

        const { data } = await axios.get(`/cartproduct/${product._id}`)
        if (data.stoke < quantity) {
            window.alert(`${product.name} out of stoke`)
            return
        }

        ctxDispatch({
            type: 'CART_ADD_ITEM',
            payload: { ...product, quantity }
        })

        handleRemoveItem(product);
        // console.log(handleRemoveItem())


        navigate(`/cartpage`);
    }


    

  return (
    <>    <Container>

    <Row style={{marginTop:"80px"}}>
    <Alert className='text-center'style={{borderRadius:"10px"}}><h2>Wishlist Items</h2></Alert>

      <Col lg={12}>
        {wishlistItems.length <0 
        ? 
        <Alert variant='danger'>
          WishList Is Empty
      </Alert>
      :
      <ListGroup variant="flush">
        <Row style={{background:"#fff",border:"1px solid #edeef2",height:"40px",}}>
        <Col style={{marginTop:"7px",}} lg={2}>Product</Col>
        <Col style={{marginTop:"7px"}} lg={2}>Name</Col>
        <Col style={{marginTop:"7px",textAlign:"center"}} lg={2}>Unit Price</Col>
        <Col style={{marginTop:"7px"}} lg={2}>Delete</Col>
        <Col style={{marginTop:"7px"}} lg={3}>Cart</Col>
        </Row>
  {wishlistItems.map((item)=>(
    <ListGroup.Item style={{marginTop:"20px"}}>
  
    <Row>
      <Col lg={2}>
        <img src={item.img} style={{width:"80px"}}/>
      </Col>
      <Col style={{textAlign:"center",}}  lg={2}>
      <Link style={{color:"#333"}} to={`/products/${item.slug}`}>{item.name}</Link>
      
      </Col>
      <Col lg={2}>
      <a>$ {item.price}</a>
      </Col>
      <Col style={{textAlign:"center"}} lg={2}>
      <a  style={{marginLeft:"0px",width:"200px",marginTop:"8px"}} onClick={()=>handleRemoveItem(item)}><Button variant='danger'>Delete</Button></a>
      </Col>
      <Col   lg={3}>
      <Button className='deleteBtn'  onClick={() => handleAddToCart(item)} variant="dark">Add To Cart </Button>
      </Col>
    </Row>
  </ListGroup.Item>
  ))}
</ListGroup>


      }
      </Col>

    </Row>

    </Container>


    </>
  )
}


export default WishList