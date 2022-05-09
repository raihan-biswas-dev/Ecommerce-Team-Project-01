import { Container, Navbar, Nav, Row, Col, Card, Button } from 'react-bootstrap'
import data from './data';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './components/Home';
import Products from './components/Products';

function App() {
  return (
    <div>

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
        </Routes>
      </BrowserRouter>




      <Navbar bg="light" variant="light">
        <Container>
          <Navbar.Brand href="#home">MERN TEAM</Navbar.Brand>
          <Nav className="ms-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#features">Products</Nav.Link>
            <Nav.Link href="#pricing">Pricing</Nav.Link>
          </Nav>
        </Container>
      </Navbar>


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
  );
}

export default App;
