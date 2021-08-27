import React, { useState, useEffect } from "react";
import { Table, Form, Button, Row, Col, ListGroup, Image } from "react-bootstrap";

import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { FaTimes,FaCheck } from "react-icons/fa";
import {FcViewDetails} from "react-icons/fc";


import { profile, UpdateProfile } from "../actions/userActions";

import { listMyOrders } from "../actions/orderActions";

const ProfileScreen = ({ location, history }) => {
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState(null);

  const userProfile = useSelector((state) => state.userProfile);
  const { loading, error, user } = userProfile;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const updateProfile = useSelector((state) => state.updateProfile);
  const { success } = updateProfile;

  const myOrders = useSelector((state) => state.myOrders);
  const { loading: loadingOrders, error: errorOrders, orders } = myOrders;
  console.log(orders);

  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    } else {
      if (!user.name) {
        dispatch(profile("profile"));
        dispatch(listMyOrders());
      } else {
        setName(user.name);
        setEmail(user.email);
      }
    }
  }, [dispatch, history, userInfo, user]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage("Password do not match");
    }
    //dispatch update profile
    dispatch(UpdateProfile({ id: user._id, name, email, password }));
  };
  return (
    <Row>
      <Col md={3}>
        <h2>User Profile</h2>
        {message && <Message variant="danger">{message}</Message>}
        {error && <Message variant="danger">{error}</Message>}
        {success && <Message variant="success">Profile Updated</Message>}
        {loading && <Loader />}
        <br></br>
        <Form onSubmit={submitHandler}>
          <Form.Group controlId="name">
            <Form.Label> Name </Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Name"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="email">
            <Form.Label> Email Address </Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            ></Form.Control>
          </Form.Group>
          <br></br>
          <Form.Group controlId="password">
            <Form.Label> Password </Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            ></Form.Control>
          </Form.Group>
          <br></br>
          <Form.Group controlId="password">
            <Form.Label>Confirm Password </Form.Label>
            <Form.Control
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
              }}
            ></Form.Control>
          </Form.Group>

          <br></br>

          <Button type="submit" variant="primary">
            {" "}
            Update
          </Button>
        </Form>
        <br></br>
        <br></br>
      </Col>

      <Col md={9}>
        <h2>My Orders</h2>
        {loadingOrders ? (
          <Loader />
        ) : errorOrders ? (
          <Message variant="danger">{errorOrders}</Message>
        ) : (
          <Table id='table' striped bordered hover responsive className="table-sm">
            <thead>
              <tr>
                <th>ORDERED DATE </th>
                {/* <th>ID</th> */}
                <th>ITEMS</th>
                <th>IMAGE</th>
                <th>TOTAL </th>
                <th>PAID </th>
                <th>DELIVERED</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id}>
                  
                  <td style={{width: '6rem'}}>{order.createdAt.substring(0,10)}</td>

                  <td style={{width: '13rem'}}>
                    {order.orderItems.map((item, index) => (
                      <ListGroup.Item  key={index}>
                        <p style={{height: '3rem' }} >{item.name} : </p>
                      </ListGroup.Item>
                     
                    ))}
                  </td>

                  <td style={{width: '6rem'}}>
                    {order.orderItems.map((item, index) => (
                      <ListGroup.Item  key={index}>
                        <Image style={{height: '4rem'}} src={item.image}  fluid rounded></Image>
                      </ListGroup.Item>
                     
                    ))}
                  </td>

                 
                  
                  

                  <td style={{width: '6rem'}}>{order.totalPrice}</td>

                  <td style={{width: '6rem'}}>
                    {order.isPaid ? (
                       (<FaCheck size='2rem' style={{color : 'green'}}/>) 
                    ) : (
                        <FaTimes size="2rem" style={{ color: "red" }} /> 
                    )}
                  </td>

                  <td style={{width: '1rem'}} >
                    {order.isDelivered ? (
                     (<FaCheck size='2rem' style={{color : 'green'}}/>) 
                    ) : (
                      <FaTimes size="2rem" style={{ color: "red" }} />
                    )}
                  </td>

                  <td style={{width: '3rem'}} >
                   
                      <a
                        style={{ textDecoration: "none" }}
                        href={`/order/${order._id}`}
                        variant="light"
                      >
                        <  FcViewDetails size='2rem' />
                      </a>
                    
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Col>
    </Row>
  );
};

export default ProfileScreen;
