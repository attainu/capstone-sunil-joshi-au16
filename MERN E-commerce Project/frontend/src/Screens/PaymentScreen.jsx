import React, { useState } from 'react'
import { Form, Button ,  Col} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from '../components/FormContainer'
import CheckoutSteps from '../components/CheckoutSteps'

import {savePaymentMethod} from '../actions/cartActions'


const PaymentScreen = ({ history}) => {

    const cart = useSelector(state => state.cart)
    console.log(cart)
    const {shippingAddress} = cart

    if(!shippingAddress){
        history.push('/shipping')
    }

    const [paymentMethod , setPaymentMethod] = useState('PayPal')
  

    const dispatch = useDispatch()
  
    const submitHandler = (e) => {
      e.preventDefault()
     dispatch(savePaymentMethod(paymentMethod))
     history.push('/placeorder')
    }
    return (
        <FormContainer>
            <CheckoutSteps step1 step2 step3 />
            <br></br>
            <h1>Payment Method</h1>
            <br></br>
            <Form onSubmit={submitHandler}>
              <Form.Group>
                <Form.Label as='legend' >Select Method</Form.Label>
      
      <br></br>
      <br></br>
      <Col>
        <Form.Check 
        type='radio' 
        label='PayPal or Credit Card' 
        id='PayPal'
        name='paymentMethod' 
        value='PayPal' 
        checked 
        onChange={(e)=>setPaymentMethod(e.target.value) }
        ></Form.Check>
      </Col>
      <br></br>
      <br></br>

      <Col>
        <Form.Check 
        type='radio' 
        label='Cash On Delivery' 
        id='cash'
        name='paymentMethod' 
        value='Cash On Delivery' 
    
        onChange={(e)=>setPaymentMethod(e.target.value) }
        ></Form.Check>
      </Col>
      </Form.Group>
     
       <br></br>
       <br></br>

        <Button type='submit' variant='primary'>
          Continue
        </Button>
      </Form>
    </FormContainer>
    )
}

export default PaymentScreen
