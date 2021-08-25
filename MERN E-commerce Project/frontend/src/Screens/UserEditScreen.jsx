import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Loader from "../components/Loader";
import Message from "../components/Message";
import FormContainer from "../components/FormContainer";



// from action
import { adminUserProfile , UpdateAdminUserProfile} from "../actions/userActions";

import {UPDATE_ADMIN_USER_DETAILS_REST} from '../reducers/constants/userConstants'

const UserEditScreen = ({ match, history }) => {
  const userId = match.params.id;
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  //get user register state from store
  const AdminUserDetails  = useSelector((state)=> state.AdminUserDetails )
  const {loading, error ,user} = AdminUserDetails 

  const UpdateAdminUser  = useSelector((state)=> state.UpdateAdminUser )
  const {loading : loadingUpdate, error : errorUpdate , success : successUpdate} = UpdateAdminUser 

  useEffect(() => {
      if(successUpdate) {
          dispatch({type :UPDATE_ADMIN_USER_DETAILS_REST })
          history.push('/admin/userlist')
      }else{
        if(!user.name || user._id !== userId ){
            dispatch(adminUserProfile(userId))
          }else {
              setName(user.name)
              setEmail(user.email)
              setIsAdmin(user.isAdmin)
          }

      }
     
      
  }, [dispatch ,userId,user , successUpdate , history]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(UpdateAdminUserProfile({_id : userId , name ,email , isAdmin}))
    
  };

  return (
    <>
      <Link to="/admin/userlist" className="btn btn-light my-3">
        Go back
      </Link>

      <FormContainer>
        <h1>Edit  User</h1>
        {loadingUpdate && <Loader/>}
        {errorUpdate && <Message variant='danger' >{errorUpdate}</Message>}
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
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

            <Form.Group controlId="isAdmin ">
              <Form.Check
                type="checkbox"
                label="Is Admin"
                checked={isAdmin}
                onChange={(e) => {
                  setIsAdmin(e.target.checked);
                }}
              ></Form.Check>
            </Form.Group>
            <br></br>

            <br></br>

            <Button type="submit" variant="primary">
              {" "}
              Update
            </Button>
          </Form>
        )}
        <br></br>
      </FormContainer>
    </>
  );
};

export default UserEditScreen;
