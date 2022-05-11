import React, { useContext, useEffect, useReducer } from 'react'
import { useNavigate, useParams } from "react-router-dom";
import 'react-inner-image-zoom/lib/InnerImageZoom/styles.min.css';
import InnerImageZoom from 'react-inner-image-zoom';
import { Helmet } from 'react-helmet-async';
import axios from 'axios'
import { Container, Row, Col, Card, Button, Alert, ListGroup, Badge } from 'react-bootstrap'
import Rating from './Rating';
import { Store } from '../Store';
import { BsHeart } from 'react-icons/bs';



function reducer(state, action) {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return { ...state, loading: false, product: action.payload };
    case 'FETCH_FAIL':
      return { ...state, err: false, err: action.payload };
    default:
      return state
  }
}


export default function ProductDetails() {
  let params = useParams();
  let navigate =useNavigate()
  const [{ loading, err, productNotfoundErr, product }, dispatch] = useReducer(reducer, {
    loading: false,
    err: '',
    productNotfoundErr: "Product Not Found",
    product: {},
  });
  useEffect(() => {
    let productData = async () => {
      dispatch({ type: 'FETCH_REQUEST' })
      try {
        let product = await axios.get(`${params.slug}`);
        dispatch({ type: 'FETCH_SUCCESS', payload: product.data })
        console.log(product.data)
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: err.message })
      }
    }
    productData()
  }, [params.slug])


  const { state , dispatch: ctxDispatch,state2,dispatch2} = useContext(Store)
  const {cart} = state


  let handleAddToCart=async()=>{
    const existingItem = cart.cartItems.find((item)=>item._id === product._id)
    const quantity = existingItem ? existingItem.quantity +1 : 1
    const {data} = await axios.get(`/cartproduct/${product._id}`)
    if(data.instock <quantity){
        window.alert(`${product.title}Product Out Of Stock`)
        return
    }
    
    ctxDispatch({
        type:'CART_ADD_ITEM',
        payload:{...product,quantity}
    })
    navigate(`/cartpage`)
}

let handleAddToWishlist= async(product)=>{
    
  dispatch2({
    type:'WISHLIST_ADD_ITEM',
    payload:{...product}
  })
}


  return (
    <Container>
      <Helmet>
        <title>{product.name}</title>
      </Helmet>
      <Row className='mt-5'>
        {product ?
          <>
            <Col lg={5}>
              <InnerImageZoom src={product.img} zoomScale={1.5} width='450' zoomSrc={product.img} alt={product.name} />
            </Col>

            <Col lg={4}>
              <Card className='p-2'>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <h4>{product.name}</h4>
                  </ListGroup.Item>
                  <ListGroup.Item>

                    Stoke {product.stoke > 0 ?
                      <Badge bg="success">
                        {product.stoke}
                      </Badge>
                      :
                      <Badge bg="danger">
                        {product.stoke}
                      </Badge>
                    }

                  </ListGroup.Item>

                  <ListGroup.Item><h5>${product.price}</h5> </ListGroup.Item>
                  <ListGroup.Item>
                    <Rating rating={product.rating} numberOfRating={product.numberOfRating} />
                  </ListGroup.Item>
                  <ListGroup.Item>{product.description} </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>

            <Col lg={3}>
              <Card className='p-3'>
                <ListGroup variant="flush">
                  <h5>Price</h5>
                  <h4>${product.price}</h4>
                </ListGroup>
                {product.stoke ==0 
                ?
              
                <ListGroup variant="flush">
                  <Button disabled onClick={handleAddToCart} variant="danger">Out Of Stock</Button>
              <button onClick={()=>handleAddToWishlist(product)}  className='wishbtnpd'>Add To WishList<BsHeart style={{marginLeft:"10px"}}/></button>
                </ListGroup>
              :
              
                <ListGroup variant="flush">
                  <Button onClick={handleAddToCart} variant="dark">Add to cart</Button>
              <button onClick={()=>handleAddToWishlist(product)}  className='wishbtnpd'>Add To WishList<BsHeart style={{marginLeft:"10px"}}/></button>
                </ListGroup>
              }
              </Card>
            </Col>
          </>
          :
          <div className='text-center'>
            <Alert className='p-5' variant="danger">
              {productNotfoundErr}
              <h3>Try another Product</h3>
            </Alert>
          </div>
        }
      </Row>
    </Container>
  )
}
