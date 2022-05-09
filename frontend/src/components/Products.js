import React from 'react'
import { Container, Row, Col, Card, Button } from 'react-bootstrap'
import data from '../data'
function Products() {
    return (
        <div>
            <Container >
                <Row>
                    {data.map(item => (
                        <Col lg={3}>
                            <Card style={{ width: '18rem' }}>
                                <Card.Img variant="top" src={item.img} />
                                <Card.Body>
                                    <Card.Title>{item.name}</Card.Title>
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