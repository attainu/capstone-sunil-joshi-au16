// redux store

import {createStore , combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension';

// import  reducers from reducers folder and files 
import { 
     productListReducer ,
     productDetailsReducer,
     productDeleteReducer,
     createProductReducer,
     updateProductReducer,
     ProductTopReducer
    } from './reducers/productReducers'

import {cartReducer} from './reducers/cartReducer'

import {
        userLoginReducer ,
        userRegisterReducer ,
        userProfileReducer ,
        userUpdateProfileReducer ,
        getUsersReducer,
        deleteUserReducer,
        AdminUserDetailsReducer,
        UpdateAdminUserReducer
    } from './reducers/userReducer'

import {
     orderCreateReducer ,
     orderDetailsReducer ,
     orderPayReducer , 
     myOrdersReducer,
     allOrdersReducer,
     orderDeliverReducer
    } from './reducers/orderReducer'



// store the imported reducers in combineReducers as state with nameing conventions
const reducer = combineReducers({
    productList         : productListReducer,
    productDetails      : productDetailsReducer,
    deleteProduct       : productDeleteReducer,
    productCreate       : createProductReducer,
    updateProduct       : updateProductReducer,
    topProducts         : ProductTopReducer,

    cart                : cartReducer,

    userLogin           : userLoginReducer,
    userRegister        : userRegisterReducer,
    userProfile         : userProfileReducer, 
    updateProfile       : userUpdateProfileReducer ,

    orderCreate         : orderCreateReducer,
    orderDetails        : orderDetailsReducer,
    orderPay            : orderPayReducer,
    myOrders            : myOrdersReducer,
    orderDeliver        : orderDeliverReducer,

    getUsers            : getUsersReducer,
    deleteUser          : deleteUserReducer,
    AdminUserDetails    : AdminUserDetailsReducer,
    UpdateAdminUser     : UpdateAdminUserReducer,
    allOrders           : allOrdersReducer

})

const cartItemsFromStorage          = localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : []
const userInfoFromStorage           = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null
const shippingAddressFromStorage    = localStorage.getItem('shippingAddress') ? JSON.parse(localStorage.getItem('shippingAddress')) : {}
const paymentMethodFromStorage      = localStorage.getItem('paymentMethod') ? JSON.parse(localStorage.getItem('paymentMethod')) : 'PayPal'

// initial states
const initialState = {
    cart :
    {
        cartItems       : cartItemsFromStorage , 
        shippingAddress : shippingAddressFromStorage , 
        paymentMethod   : paymentMethodFromStorage 
    },


    userLogin : {userInfo : userInfoFromStorage},
   
}

const middleware = [thunk]

const store = createStore(reducer, initialState ,composeWithDevTools(applyMiddleware(...middleware)) )

export default store