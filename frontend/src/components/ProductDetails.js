import React, { useEffect, useReducer } from 'react'
import { useParams } from "react-router-dom";
import axios from 'axios'
import { Container, Row, Col, Card, Button, Spinner, ListGroup } from 'react-bootstrap'



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


  const [{ loading, err, product }, dispatch] = useReducer(reducer, {
    loading: false,
    err: '',
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






  return (
    // <div>{params.slug}</div>
    <Container>
      <Row>
        <Col lg={6}>Image</Col>
        <Col lg={3}>
          <Card style={{ width: '18rem' }}>
            <ListGroup variant="flush">
              <ListGroup.Item>{product.name}</ListGroup.Item>
              <ListGroup.Item>{product.price}</ListGroup.Item>
              <ListGroup.Item>{product.description}</ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
        <Col lg={3}>Add to cart</Col>
      </Row>
    </Container>
  )
}
