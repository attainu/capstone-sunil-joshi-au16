import React, { useState , useEffect} from "react";
import axios from 'axios'
import {PayPalButton} from 'react-paypal-button-v2'

import {
  Row,
  Col,
  ListGroup,
  Image,
  Card,
  Button
} from "react-bootstrap";

import { useDispatch, useSelector } from "react-redux";
import Message from '../components/Message'
import Loader from '../components/Loader'

import {getOrderDetails, payOrder , deliverOrder} from '../actions/orderActions'
import {ORDER_PAY_RESET, ORDER_DELIVER_RESET} from '../reducers/constants/orderConstants'


const OrderScreen = ({match, history}) => {
    const orderId = match.params.id

    const [sdkReady , setSdkReady] = useState(false)

    const dispatch = useDispatch();

    const  orderDetails = useSelector((state) => state.orderDetails)
    const {order ,loading , error } =  orderDetails

    console.log(order)

    const  orderPay = useSelector((state) => state.orderPay)
    const {loading: loadingDeliver , success: successDeliver } =  orderPay

    const  orderDeliver = useSelector((state) => state.orderDeliver)
    const {loading: loadingPay , success: successPay } =  orderDeliver

    const  userLogin  = useSelector((state) => state.userLogin )
    const {userInfo} =  userLogin 

  if(!loading){

        const addDecimals = (num) => {
            return (Math.round(num * 100)/100).toFixed(2)
        }
        // calculate price
        order.itemsPrice = addDecimals(order.orderItems.reduce((acc, item)=> acc + item.price * item.qty , 0) )
    }
 
  useEffect(()=>{
      if(!userInfo){
          history.push('/login')
      }
      const addPayPalScript =  async () =>{
        const {data : clientId} = await axios.get('/api/config/paypal')
        const script = document.createElement('script')
        script.type = 'text/javascript'
        script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`
        script.async = true
        script.onload = () => {
            setSdkReady(true)
        }
        document.body.appendChild(script)
      }
    if(!order || successPay ){
        dispatch({type : ORDER_PAY_RESET})
        dispatch({type : ORDER_DELIVER_RESET})
        dispatch(getOrderDetails(orderId))
    }else if(!order.isPaid){
        if(!window.paypal){
            addPayPalScript()
        }else{
            setSdkReady(true)
        }
    }    

  
  },[dispatch, orderId , successPay, successDeliver , order , userInfo , history])
// if loading show loader else error show message else jsx

const successPaymentHandler = (paymentResult) => {
    console.log(paymentResult)
    dispatch(payOrder(orderId ,paymentResult))

}

const deliverHandler =()=>{
    dispatch(deliverOrder(order))
}



  return loading ? <Loader/> : error ? <Message variant="danger" >{error} </Message> : 
  <>
  <h1>Order </h1>
  <hr></hr>
   
      
       
        <Row>
          <Col  md={8}>
           <ListGroup.Item>
                  <h2>Oder Items</h2>
                  {
                      order.orderItems.length === 0 ? <Message>Your order is empty</Message>
                      : (
                          <ListGroup variant='flush' >
                              {order.orderItems.map((item , index) => (
                                  <ListGroup.Item key={index} >
                                      <Row>
                                          <Col md={1}>
                                              <Image src={item.image} alt={item.name} fluid rounded></Image>
                                          </Col>

                                          <Col>
                                            <p >{item.name} : </p>
                                          </Col>
                                          <Col md={4} style={{width:"50%"}}>
                                              {item.qty}  x ₹{item.price} = ₹{item.qty * item.price}
                                          </Col>
                                      </Row>
                                  </ListGroup.Item>
                              ))}

                          </ListGroup>
                      )
                  }
              </ListGroup.Item>
              <hr></hr>
            <ListGroup variant="flush">
              <ListGroup.Item>
              <h2>User Details</h2>
               <p> <strong>User Name : {order.user.name} </strong></p>
               <p> <strong>User Email : {order.user.email} </strong></p>
                
              
            </ListGroup.Item>

             <ListGroup.Item>
                <h2>Shipping </h2>
                <p> Name : {order.shippingAddress.name} ,</p>
                <p>  Phone : {order.shippingAddress.phone}</p>
                
                  <strong>
                    Address: {order.shippingAddress.address},
                    {order.shippingAddress.city}
                    {""},{order.shippingAddress.postalCode}
                    {""},{order.shippingAddress.country}{" "}
                  </strong>
             
                  {order.isDelivered ? 
                  <Message variant='success' >Delivered On {order.deliveredAt.substring(0,10)} </Message> :
                   <Message variant='danger' >Not Delivered </Message>}
              </ListGroup.Item>

              <ListGroup.Item>
               <h2>Payment Method</h2>
               <p>
               <strong>Method : {order.paymentMethod}</strong>
               </p>
               {order.isPaid ? <Message variant='success' >Paid On {order.paidAt.substring(0,10)} </Message> : <Message variant='danger' >Not Paid </Message>}
              </ListGroup.Item>

             
            </ListGroup>
          </Col>

          <Col ma={4}>
            <Card>
                <ListGroup variant="flush" >
                    <ListGroup.Item>
                        <h2>Order Summary</h2>
                    </ListGroup.Item>

                    <ListGroup.Item>
                        <Row>
                            <Col>Items:</Col>
                            <Col>₹{order.itemsPrice}</Col>
                        </Row>
                        
                    </ListGroup.Item>

                    <ListGroup.Item>
                        <Row>
                            <Col>Shipping:</Col>
                            <Col>₹{order.shippingPrice}</Col>
                        </Row>
                        
                    </ListGroup.Item>

                    <ListGroup.Item>
                        <Row>
                            <Col>Tax:</Col>
                            <Col>₹{order.taxPrice}</Col>
                        </Row>
                        
                    </ListGroup.Item>

                    <ListGroup.Item>
                        <Row>
                            <Col>Total:</Col>
                            <Col>${order.totalPrice}</Col>
                        </Row>
                        
                    </ListGroup.Item>
                {!order.isPaid && (
                    <ListGroup>
                    {loadingPay && <Loader/>}
                    { !sdkReady? <Loader/> :
                    (<PayPalButton
                    amount = {order.totalPrice}
                    onSuccess= {successPaymentHandler}
                     />)
                    }
                    </ListGroup>
                )}
                {loadingDeliver && <Loader/>}
            {userInfo && userInfo.isAdmin && order.isPaid && !order.isDelivered && (
                <ListGroup.Item>
                <Button type='button' className ='btn btn-block' onClick={deliverHandler} >
                            Mark as Delivered
                        </Button>   
                </ListGroup.Item>
            )}
                  

                </ListGroup>
                
            </Card>
          </Col>
        </Row>
     
  
  <hr></hr>

  </>
};

export default OrderScreen;
