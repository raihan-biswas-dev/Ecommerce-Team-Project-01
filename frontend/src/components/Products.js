import React, { useContext, useEffect, useReducer } from 'react'
import { Container, Row, Col, Card, Button, Spinner } from 'react-bootstrap'
import { Link } from "react-router-dom";
import axios from 'axios'
import { Helmet } from 'react-helmet-async';
import Rating from './Rating';
import { Store } from '../Store';



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

    const { state , dispatch: ctxDispatch,} = useContext(Store)
    const {cart} = state

    let handleAddToCart=async(product)=>{
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
    }


    const {cart:{cartItems}} = state
  
  




    return (
        <div>
            <Container >
                <Helmet>
                    <title>product page</title>
                </Helmet>
                <Row>
                    {loading ? <div className='loading'>
                        <Spinner animation="grow" variant="success" />
                    </div>
                        :

                        product.map((item, index) => (
                            <Col lg={3} key={index}>
                                <Card style={{ width: '18rem' }}>
                                    <Card.Img variant="top" src={item.img} />
                                    <Card.Body>
                                        <Card.Title>
                                            <Link className='productTitle' to={`/products/${item.slug}`}>{item.name}</Link>
                                        </Card.Title>

                                        <Card.Title>${item.price}</Card.Title>
                                        <Rating rating={item.rating} numberOfRating={item.numberOfRating} />
                                        {console.log(product.numberOfRating)}
                                        <Card.Text>
                                            {item.carddescription}
                                        </Card.Text>
                                        {item.stoke == 0
          ?
          <span class="add-to-cart">
          <Button disabled className='addTocartBtn' variant="danger">Out Of Stock</Button>
        </span>
          
          :
            <span class="add-to-cart">
              <Button onClick={()=>handleAddToCart(item)}  className='addTocartBtn' variant="primary">Add to cart</Button>
              
            </span>
            
}
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))}
                </Row>
            </Container>
        </div>
    )
}

export default Products