import InnerImageZoom from 'react-inner-image-zoom';
import React, { useContext, useEffect, useReducer, useState } from 'react'
import { Container, Row, Col, Card, Button, Spinner, Modal } from 'react-bootstrap'

import { Link } from "react-router-dom";
import axios from 'axios'
import { Helmet } from 'react-helmet-async';
import Rating from './Rating';
import { Store } from '../Store';
import { BsHeart } from 'react-icons/bs';
import { AiOutlineEye } from 'react-icons/ai';


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





function Products() {

    const [productDetails, setProductDetails] = useState({})


    const [lgShow, setLgShow] = useState(false);
    const [{ loading, err, product }, dispatch] = useReducer(reducer, {
        loading: false,
        err: '',
        product: [],
    });
    const [details,setDetails] = useState({})
    useEffect(() => {
        let productData = async () => {
            dispatch({ type: 'FETCH_REQUEST' })
            try {
                let product = await axios.get("/api/products");
                dispatch({ type: 'FETCH_SUCCESS', payload: product.data })

            } catch (err) {
                dispatch({ type: 'FETCH_FAIL', payload: err.message })
            }
        }
        productData()

    }, [])

    const { state, dispatch: ctxDispatch, dispatch2 } = useContext(Store)
    const { cart } = state



    let handleAddToCart=async(product)=>{
        const existingItem = cart.cartItems.find((item)=>item._id === product._id)
        const quantity = existingItem ? existingItem.quantity +1 : 1
        const {data} = await axios.get(`/cartproduct/${product._id}`)       
        const {cart:{cartItems}} = state
        if(data.instock <quantity){

            window.alert(`${product.title}Product Out Of Stock`)
            return
        }

        ctxDispatch({
            type: 'CART_ADD_ITEM',
            payload: { ...product, quantity }
        })
    }




    let handleDetails=async(pro)=>{
        setLgShow(true)
        let productDetails = await axios.get(`/products/${pro}`)
        setDetails(productDetails.data)
      }
      
    let handleAddToWishlist= async(product)=>{
    
        dispatch2({
          type:'WISHLIST_ADD_ITEM',
          payload:{...product}
        })
      }





    return (
        <div>
            <Container >
                <Helmet>
                    <title>product page</title>
                </Helmet>
                <Row className='mt-5'>
                    {loading ? <div className='loading'>
                        <Spinner animation="grow" variant="success" />
                    </div>
                        :

                        product.map((item, index) => (
                            <Col lg={3} key={index} className='mt-3'>
                                <Card>

                                    <div style={{ cursor: "pointer" }} onClick={() => handleDetails(item.slug)}>
                                        <Card.Img variant="top" src={item.img} />
                                    </div>


                                    <Card.Body>
                                        <Card.Title>
                                            <Link className='productTitle' to={`/products/${item.slug}`}>{item.name}</Link>
                                        </Card.Title>

                                        <Card.Title className='productPrice'>${item.price}</Card.Title>
                                        <Rating rating={item.rating} numberOfRating={item.numberOfRating} />
                                       
                                        <Card.Text>
                                            {item.carddescription}
                                        </Card.Text>

                                        {item.stoke === 0
                                            ?
                                            <span class="add-to-cart">
                                                <Button size="sm" disabled className='addTocartBtn me-2' variant="danger">Out Of Stock</Button>
                                                <Button size="sm" className="me-2" onClick={() => handleDetails(item.slug)}>Details</Button>
                                                <button style={{ marginLeft: "130px", marginTop: "-4px", position: "absolute", fontSize: "20px", background: "transparent", borderColor: "transparent", color: "#fff" }}><BsHeart className='heart' /></button>
                                                <Button onClick={() => handleAddToWishlist(item)} className='wishbtn1'><BsHeart /></Button>
                                            </span>

                                            :
                                            <span class="add-to-cart">
                                                <Button size="sm" className="me-2" onClick={() => handleAddToCart(item)} variant="primary">Add to cart</Button>
                                                <Button size="sm" className="me-2" onClick={() => handleDetails(item.slug)}>Details</Button>
                                                <Button className="me-3 wishbtn" onClick={() => handleAddToWishlist(item)}><BsHeart /></Button>

                                            </span>

                                        }
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))}
                </Row>

                {/* Modal part start */}
                <Modal className=""
                    size="lg"
                    show={lgShow}
                    onHide={() => setLgShow(false)}
                    aria-labelledby="example-modal-sizes-title-lg"
                >
                    <Modal.Header closeButton>
                        <Modal.Title id="example-modal-sizes-title-lg">
                            Product Details
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body className="productModalMain">
                        {
                            productDetails ?
                                <Card className="">
                                    <Row>
                                        <Col lg={6}>
                                            <InnerImageZoom src={productDetails.img} zoomScale={2} zoomSrc={productDetails.img} alt={productDetails.name} />

                                        </Col>
                                        <Col lg={6}>
                                            <Card.Body className="text-left mt-5">
                                                <Card.Title>
                                                    <h3>{productDetails.name}</h3>
                                                </Card.Title>
                                                <Card.Title>
                                                    <h4>${productDetails.price}</h4>
                                                </Card.Title>
                                                <Card.Text className="productModalDes">
                                                    {productDetails.description}
                                                </Card.Text>
                                                <Button onClick={() => handleAddToCart(productDetails)} className="modalAddToCartBtn" >Add to cart</Button>
                                            </Card.Body>
                                        </Col>
                                    </Row>
                                </Card>
                                :
                                <h3>Details Not Found</h3>
                        }
                    </Modal.Body>
                </Modal>
                {/* Modal part start */}


                <Modal
        size="lg"
        show={lgShow}
        onHide={() => setLgShow(false)}
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-lg">
            Product Details
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {details? 
        
        
        <Card>
  <Card.Header>{details.name}</Card.Header>
  <Card.Body>
    <img src={details.img} style={{width:"350px"}}/>
    <div className='detailscard'>
      <Card.Title>{details.name}</Card.Title>
    <Card.Text>
      {details.description}
    </Card.Text>
    <Card.Text>
      <Rating rating={details.rating} numberofrating={details.numberofrating} className='rating'/>
    </Card.Text>
    <Card.Text style={{color:"#F7941D",fontSize:"20px"}}>
      $ {details.price}
    </Card.Text>
    <button onClick={()=>handleAddToWishlist(details)} style={{marginLeft:"320px",marginTop:"-90px",position:"absolute",fontSize:"20px",background:"transparent",borderColor:"transparent"}}><BsHeart className='heart'/></button>
    {details.stoke==0
    
    ?
  
    <button style={{marginLeft:"120px",background:"#dc3545",color:"#fff",borderRadius:"5px",height:"35px",width:"120px"}} disabled className='txt1 buynowpp'>Out Of Stock</button>
  
  :
  <>
  <button className='addtocartdetails' onClick={()=>handleAddToCart(details)} >Add in cart</button>
  </>
  
  }
    </div>
    
  </Card.Body>
</Card>
:
<h1>Details Not Found</h1>

}
</Modal.Body>
</Modal>
            </Container>
        </div>
    )
}

export default Products