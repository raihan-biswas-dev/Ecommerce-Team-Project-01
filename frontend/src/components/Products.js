import React, { useEffect, useReducer } from 'react'
import { Container, Row, Col, Card, Button, Spinner } from 'react-bootstrap'
import { Link } from "react-router-dom";
import axios from 'axios'
import Rating from './Rating';


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
                let product = await axios.get("/products");
                dispatch({ type: 'FETCH_SUCCESS', payload: product.data })
                console.log(product.data)
            } catch (err) {
                dispatch({ type: 'FETCH_FAIL', payload: err.message })
            }
        }
        productData()

    }, [])








    return (
        <div>
            <Container >

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
                                            <Link to={`/products/${item.slug}`}>{item.name}</Link>
                                        </Card.Title>
                                        <Card.Title>${item.price}</Card.Title>
                                        <Rating rating={item.rating} numerOfRating={item.numerOfRating} />
                                        <Card.Text>
                                            {item.carddescription}
                                        </Card.Text>
                                        <Button className='addTocartBtn' variant="primary">Add to cart</Button>
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