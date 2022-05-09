import React, { useState, useEffect } from 'react'
import { Container, Row, Col, Card, Button } from 'react-bootstrap'
import { Link } from "react-router-dom";
import axios from 'axios'


function Products() {


    const [product, setProduct] = useState([])


    useEffect(() => {
        async function fetchProduct() {
            let { data } = await axios.get("http://localhost:8000/products")
            setProduct(data)
        }
        fetchProduct()

    }, [])









    return (
        <div>
            <Container >
                <Row>
                    {product.map((item, index) => (
                        <Col lg={3} key={index}>
                            <Card style={{ width: '18rem' }}>
                                <Card.Img variant="top" src={item.img} />
                                <Card.Body>
                                    <Card.Title>
                                        <Link to={`/products/${item.slug}`}>{item.name}</Link>
                                    </Card.Title>
                                    <Card.Title>${item.price}</Card.Title>
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