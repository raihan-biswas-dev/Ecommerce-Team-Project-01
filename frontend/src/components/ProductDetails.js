import React, { useContext, useEffect, useReducer, useState } from 'react'
import { useNavigate, useParams } from "react-router-dom";
import 'react-inner-image-zoom/lib/InnerImageZoom/styles.min.css';
import InnerImageZoom from 'react-inner-image-zoom';
import { Helmet } from 'react-helmet-async';
import axios from 'axios'
import { Container, Row, Col, Card, Button, Alert, ListGroup, Badge, Form } from 'react-bootstrap'
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
  let navigate = useNavigate()
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


  const { state, dispatch: ctxDispatch, state2, dispatch2, state3 } = useContext(Store)
  const { cart } = state
  const { userInfo } = state3
  const [couponText, setCouponText] = useState("")
  const [errCoupon, setErrCoupon] = useState("")
  const [discountPrice, setdDiscountPrice] = useState("")
  const [{ productNotFoundErr }] = useReducer(reducer, {
    loading: false,
    err: '',
    product: {},
    productNotFoundErr: 'Product Not found Try another Product'
  });


  let handleAddToCart = async () => {

    if (userInfo) {
      const existingItem = cart.cartItems.find((item) => item._id === product._id)
      const quantity = existingItem ? existingItem.quantity + 1 : 1
      const { data } = await axios.get(`/cartproduct/${product._id}`)
      if (data.instock < quantity) {
        window.alert(`${product.title}Product Out Of Stock`)
        return
      }

      ctxDispatch({
        type: 'CART_ADD_ITEM',
        payload: { ...product, price: discountPrice ? discountPrice : product.price, quantity }
      })
      navigate(`/cartpage`)
    }else{
      window.alert("Please login first")
      navigate(`/signin`)
    }
  }

  let handleAddToWishlist = async (product) => {

    dispatch2({
      type: 'WISHLIST_ADD_ITEM',
      payload: { ...product }
    })
  }

  let handleCouponText = (e) => {
    setCouponText(e.target.value)
  }

  let handleCoupon = () => {

    if (product.coupon !== "") {
      if (product.coupon == couponText) {
        let discountPrice = (product.price * product.discount) / 100
        let afterDiscountProduct = product.price - discountPrice
        if (afterDiscountProduct < product.discountLimit) {
          setErrCoupon("For this price discount not applicable")
        } else {
          setdDiscountPrice(afterDiscountProduct)
        }
      } else {
        setErrCoupon("Wrong coupon code")
      }
    } else {
      setErrCoupon("Coupon not available")
    }

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
                {product.stoke == 0
                  ?

                  <>
                    <ListGroup variant="flush">
                      <Button disabled onClick={handleAddToCart} variant="danger">Out Of Stock</Button>
                      <button onClick={() => handleAddToWishlist(product)} className='wishbtnpd'>Add To WishList<BsHeart style={{ marginLeft: "10px" }} /></button>
                    </ListGroup>
                    <Form.Control className='mt-3' disabled type="text" placeholder="Discount Not Avaiable" />
                    <Form.Text id="passwordHelpBlock" muted>
                      {errCoupon}
                    </Form.Text>
                    <Button disabled className="mt-3" variant="dark">Apply</Button>


                  </>
                  :

                  <ListGroup variant="flush">
                    <ListGroup.Item><h3>Price</h3></ListGroup.Item>
                    <ListGroup.Item>
                      <h4>${discountPrice ? <del>{product.price}</del> : product.price}</h4>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      {discountPrice ? <h5>After discount : ${discountPrice}</h5> : ""}
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <Form.Control onChange={handleCouponText} type="text" placeholder="Coupon code" />
                      <Form.Text id="passwordHelpBlock" muted>
                        {errCoupon}
                      </Form.Text>
                      <br />
                      <Button onClick={handleCoupon} className="me-3" variant="dark">Apply</Button>
                      <Button onClick={handleAddToCart} variant="dark">Add To Cart</Button>
                    </ListGroup.Item>
                    <button onClick={() => handleAddToWishlist(product)} className='wishbtnpd'>Add To WishList<BsHeart style={{ marginLeft: "10px" }} /></button>
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
