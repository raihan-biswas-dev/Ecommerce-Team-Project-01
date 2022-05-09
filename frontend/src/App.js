import { Container, Navbar, Nav} from 'react-bootstrap'
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
    </div>
  );
}

export default App;
