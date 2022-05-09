import { Container, Navbar, Nav } from 'react-bootstrap'
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from './components/Home';
import Products from './components/Products';
import ProductDetails from './components/ProductDetails';

function App() {
  return (
    <div>




      <BrowserRouter>
        <Navbar bg="light" variant="light">
          <Container>
            <Navbar.Brand href="#home">MERN TEAM</Navbar.Brand>
            <Nav className="ms-auto mainMenu">
              <Link to="/backend">Home</Link>
              <Link to="/products">Products</Link>
            </Nav>
          </Container>
        </Navbar>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:slug" element={<ProductDetails />} />
        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;
