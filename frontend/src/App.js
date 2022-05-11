import { Container, Navbar, Nav, NavDropdown, Dropdown, Button } from 'react-bootstrap'
import { BrowserRouter, Routes, Route, Link, useNavigate } from "react-router-dom";
import Home from './components/Home';
import Login from './components/Login';
import Products from './components/Products';
import Signup from './components/Signup';
import { useContext } from 'react';
import { Store } from './Store';
import { ToastContainer, } from 'react-toastify';
import ProductDetails from './components/ProductDetails';
import CartPage from './components/CartPage';



function App() {
  const { state3, dispatch3 } = useContext(Store)
  const { userInfo } = state3
  let handleLogout = () => {
    dispatch3({ type: "USER_LOGOUT" })
    localStorage.removeItem("userInfo")
  }

  const {state,dispatch,} = useContext(Store)
  const {cart:{cartItems}} = state



let handleRemoveItem=(item)=>{
  dispatch({
      type:'CART_REMOVE_ITEM',
      payload:item
  })
}

let updateCart=(item,quantity)=>{
  dispatch({
      type:'CART_ADD_ITEM',
      payload:{...item,quantity}
  })
}

  return (
    <>

      <BrowserRouter>
        <Navbar bg="light" variant="light">
          <Container>
            <Navbar.Brand href="#home">MERN TEAM</Navbar.Brand>
            <Nav className="ms-auto mainMenu">
              <Link to="/">Home</Link>
              <Link to="/products">Products</Link>
              <NavDropdown id="nav-dropdown-dark-example" className="menuicn" title="Cart">
        {cartItems.map((item)=>(
        <div>
          <img src={item.img} style={{width:"80px"}}/>
          <Link className='droptitle' to={`/products/${item.slug}`}>{item.name}</Link>
          <Button variant='danger' onClick={()=>handleRemoveItem(item)} style={{marginLeft:"10px"}} >Delete</Button>
          <div style={{marginLeft:"100px",marginTop:"-40px"}}>
          <Button variant="light" onClick={()=>updateCart(item,item.quantity-1)} disabled={item.quantity === 1}>-</Button>
      <span>{item.quantity}</span>
      <Button variant="light" onClick={()=>updateCart(item,item.quantity+1)}  disabled={item.quantity == item.instock}>+</Button>
          </div>
          <Dropdown.Divider />
          </div>
          
        ))}
        <Dropdown.Divider />
        <div>
          
          <Button className='viewcart'><Link style={{color:"#fff"}} to='/cartpage'>View Cart</Link></Button>
           </div>
        </NavDropdown>
              <Nav.Link >
                {userInfo ?
                  <NavDropdown title={userInfo.name} id="basic-nav-dropdown">
                    <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item onClick={handleLogout} >Log Out</NavDropdown.Item>
                  </NavDropdown>
                  :
                  <Link to='/signin'>Log In</Link>
                }
                
              </Nav.Link>
            </Nav>
          </Container>
        </Navbar>



        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:slug" element={<ProductDetails />} />
          <Route path="/signin" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/cartpage" element={<CartPage />} />
        </Routes>

        <Container>
          <ToastContainer position='bottom-center' limit={1} />
        </Container>

      </BrowserRouter>

    </>

  )
};

export default App;

