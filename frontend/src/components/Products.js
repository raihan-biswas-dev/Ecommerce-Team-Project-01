import React, { useContext, useState, useEffect, useReducer } from 'react'
import { Container, Row, Col, Card, Button, Spinner, Modal } from 'react-bootstrap'
import InnerImageZoom from 'react-inner-image-zoom';
import { Link } from "react-router-dom";
import axios from 'axios'
import { Helmet } from 'react-helmet-async';
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





function Products() {


    const [lgShow, setLgShow] = useState(false);
    const [productDetails, setProductDetails] = useState({})

    const [{ loading, err, product }, dispatch] = useReducer(reducer, {
        loading: false,
        err: '',
        product: [],
    });
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

    let handleAddToCart = async (product) => {
        const existingItem = cart.cartItems.find((item) => item._id === product._id)
        const quantity = existingItem ? existingItem.quantity + 1 : 1
        const { data } = await axios.get(`/cartproduct/${product._id}`)
        if (data.instock < quantity) {
            window.alert(`${product.title}Product Out Of Stock`)
            return
        }

        ctxDispatch({
            type: 'CART_ADD_ITEM',
            payload: { ...product, quantity }
        })
    }

    let handleAddToWishlist = async (product) => {

        dispatch2({
            type: 'WISHLIST_ADD_ITEM',
            payload: { ...product }
        })
    }


    let handleDetails = async (pro) => {
        setLgShow(true)
        let productDetails = await axios.get(`/products/${pro}`);
        setProductDetails(productDetails.data)
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
                                        {console.log(product.numberOfRating)}
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
            </Container>
        </div>
    )
}

export default Products