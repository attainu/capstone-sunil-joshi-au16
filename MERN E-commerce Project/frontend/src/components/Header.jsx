import React from "react";
import { useDispatch ,useSelector} from 'react-redux';
import { LinkContainer } from "react-router-bootstrap";
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import {logout} from '../actions/userActions'
import { FaOpencart , FaUserAlt , FaUsers } from 'react-icons/fa';
import Searchbox from './Searchbox'
import {Route} from 'react-router-dom'

import { AiOutlineLogout,AiFillShop} from 'react-icons/ai';
// import './Header.css';

const Header = () => {

  const dispatch = useDispatch()

  const userLogin = useSelector( state => state.userLogin )
  const { userInfo} = userLogin

  const logoutHandler = () => {
    dispatch(logout())
  }

  return (
    <header>
      <Navbar className = 'primary' bg="dark" variant="dark" expand="lg" fixed="top" collapseOnSelect>
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand  ><AiFillShop/> E-Angadi</Navbar.Brand>
          </LinkContainer>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Route render={(history) => <Searchbox history={history} />}/>
          <Nav
      className="mr-auto my-2 my-lg-0"
      style={{ maxHeight: '100px' }}
      navbarScroll
    >
      <Nav.Link href="#action1"disabled></Nav.Link>
      <Nav.Link href="#action2"  disabled></Nav.Link>
      <Nav.Link href="#" disabled></Nav.Link>
    </Nav>


         
            <Nav className="d-flex" >
              <LinkContainer  to="/cart">
                <Nav.Link  >
                  {" "}
               <FaOpencart  size="2em"/>  Cart
                </Nav.Link>
              </LinkContainer>
              {
                userInfo ? (
                  <NavDropdown title={userInfo.name} id='username'>
                    <LinkContainer to='/profile'>
                        <NavDropdown.Item><FaUserAlt/> Profile</NavDropdown.Item>
                    </LinkContainer>
                    <NavDropdown.Item onClick = {logoutHandler} ><AiOutlineLogout/> Logout</NavDropdown.Item>
                  </NavDropdown>    

                ) : <LinkContainer to="/login">
                <Nav.Link  >
                  <FaUserAlt /> Log in
                </Nav.Link>
              </LinkContainer>
              }

              { userInfo && userInfo.isAdmin && (
                 <NavDropdown title='Admin' id='adminmenu'>

                 <LinkContainer to='/admin/userlist'>
                     <NavDropdown.Item> < FaUsers/> Users</NavDropdown.Item>
                 </LinkContainer>

                 <LinkContainer to='/admin/productlist'>
                     <NavDropdown.Item>Products</NavDropdown.Item>
                 </LinkContainer>

                 <LinkContainer to='/admin/orderlist'>
                     <NavDropdown.Item>Orders</NavDropdown.Item>
                 </LinkContainer>
            
               </NavDropdown>    

              ) }
             
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

     
    </header>


    
  );
};

export default Header;
