import { 
    ORDER_CREATE_REQUEST,
    ORDER_CREATE_SUCCESS ,
    ORDER_CREATE_FAIL ,

    ORDER_DETAILS_REQUEST,
    ORDER_DETAILS_SUCCESS,
    ORDER_DETAILS_FAIL,

    ORDER_PAY_REQUEST,
    ORDER_PAY_SUCCESS,
    ORDER_PAY_FAIL,
 

    ORDER_MY_LIST_REQUEST,
    ORDER_MY_LIST_SUCCESS,
    ORDER_MY_LIST_FAIL,

    ALL_ORDER_REQUEST,
    ALL_ORDER_SUCCESS,
    ALL_ORDER_FAIL,

    ORDER_DELIVER_REQUEST,
    ORDER_DELIVER_SUCCESS,
    ORDER_DELIVER_FAIL
   } from '../reducers/constants/orderConstants'
import axios from 'axios'

export const createOrder = (order) => async (dispatch , getState)  => {
    try {
        
        dispatch({
            type: ORDER_CREATE_REQUEST
        })

        const {userLogin : {userInfo}} = getState()
        const config = {
            headers : {
                'content-type' : 'application/json', 
                Authorization : `Bearer ${userInfo.token}`
            }
        }

        console.log(order)

        const {data} = await axios.post(`/api/orders`, order, config)
        // console.log(x.createOrder)
        // const data = x.createOrder
        dispatch({
            type :ORDER_CREATE_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: ORDER_CREATE_FAIL ,
            payload : error.response && error.response.data.message 
            ? 
            error.response.data.message
            :
            error.message
        })
    }
}

export const getOrderDetails =(id) =>  async (dispatch ,getState) => {
    try {

        dispatch({
            type : ORDER_DETAILS_REQUEST
        })

        const { userLogin : {userInfo}} = getState()
        const config = {
            headers : {
               
                Authorization : `Bearer ${userInfo.token}`
            }
        }
        
        const {data} = await axios.get(`/api/orders/${id}`, config)

        dispatch({
            type: ORDER_DETAILS_SUCCESS,
            payload : data
        })

    } catch (error) {
         dispatch({
            type: ORDER_DETAILS_FAIL ,
            payload : error.response && error.response.data.message 
            ? 
            error.response.data.message
            :
            error.message
        })
        
    }
}

export const payOrder =(orderId , paymentResult) =>  async (dispatch ,getState) => {
    try {

        dispatch({
            type :  ORDER_PAY_REQUEST
        })

        const { userLogin : {userInfo}} = getState()
        const config = {
            headers : {
               'content-type' : 'application/json', 
                Authorization : `Bearer ${userInfo.token}`
            }
        }
       
        const {data} = await axios.put(`/api/orders/${orderId}/pay`, paymentResult, config)
       
        dispatch({
            type: ORDER_PAY_SUCCESS,
            payload : data
        })

    } catch (error) {
         dispatch({
            type: ORDER_PAY_FAIL ,
            payload : error.response && error.response.data.message 
            ? 
            error.response.data.message
            :
            error.message
        })
        
    }
}

export const listMyOrders =() =>  async (dispatch ,getState) => {
    try {

        dispatch({
            type : ORDER_MY_LIST_REQUEST
        })

        const { userLogin : {userInfo}} = getState()
        const config = {
            headers : {  
                Authorization : `Bearer ${userInfo.token}`
            }
        }
        
        const {data} = await axios.get('/api/orders/myorders', config)
        console.log(data)
        dispatch({
            type: ORDER_MY_LIST_SUCCESS,
            payload : data
        })

    } catch (error) {
         dispatch({
            type: ORDER_MY_LIST_FAIL ,
            payload : error.response && error.response.data.message 
            ? 
            error.response.data.message
            :
            error.message
        })
        
    }
}

export const allTheOrders =() =>  async (dispatch ,getState) => {
    try {

        dispatch({
            type :  ALL_ORDER_REQUEST
        })

        const { userLogin : {userInfo}} = getState()
        const config = {
            headers : {  
                Authorization : `Bearer ${userInfo.token}`
            }
        }
        
        const {data} = await axios.get('/api/orders', config)
        console.log(data)
        dispatch({
            type: ALL_ORDER_SUCCESS,
            payload : data
        })

    } catch (error) {
         dispatch({
            type: ALL_ORDER_FAIL ,
            payload : error.response && error.response.data.message 
            ? 
            error.response.data.message
            :
            error.message
        })
        
    }
}

export const deliverOrder =(order) =>  async (dispatch ,getState) => {
    try {

        dispatch({
            type :  ORDER_DELIVER_REQUEST
        })

        const { userLogin : {userInfo}} = getState()
        const config = {
            headers : {
             
                Authorization : `Bearer ${userInfo.token}`
            }
        }
       
        const {data} = await axios.put(`/api/orders/${order._id}/deliver`, {}, config)
       
        dispatch({
            type: ORDER_DELIVER_SUCCESS,
            payload : data
        })

    } catch (error) {
         dispatch({
            type: ORDER_DELIVER_FAIL ,
            payload : error.response && error.response.data.message 
            ? 
            error.response.data.message
            :
            error.message
        })
        
    }
}