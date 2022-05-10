import { Container, Navbar, Nav, NavDropdown} from 'react-bootstrap'
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from './components/Home';
import Login from './components/Login';
import Products from './components/Products';
import Signup from './components/Signup';
import { useContext } from 'react';
import { Store } from './Store';
import { ToastContainer, } from 'react-toastify';


function App() {
  const {state3,dispatch3} = useContext(Store)
  const {userInfo} = state3
  let handleLogout=()=>{
    dispatch3({type: "USER_LOGOUT"})
    localStorage.removeItem("userInfo")
  }
  return (
    <div>        


      <Navbar bg="light" variant="light">
        <Container>
          <Navbar.Brand >MERN TEAM</Navbar.Brand>
          <Nav className="ms-auto">
            <Nav.Link >Home</Nav.Link>
            <Nav.Link >Products</Nav.Link>
            <Nav.Link >Pricing</Nav.Link>
            <Nav.Link >
              {userInfo ?
              <NavDropdown title={userInfo.name} id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item onClick={handleLogout} >Log Out</NavDropdown.Item>
            </NavDropdown>
              :
              
              // <Link to='/signin'>Log In</Link>
              <h5>log in</h5>
      
              }
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/signin" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
        <Container>
        <ToastContainer position='bottom-center' limit={1} />
        </Container>
      </BrowserRouter>
    </div>
    
  );
}

export default App;
