import {    PRODUCT_LIST_REQUEST ,
            PRODUCT_LIST_SUCCESS ,
            PRODUCT_LIST_FAIL,

            PRODUCT_DETAILS_REQUEST , 
            PRODUCT_DETAILS_SUCCESS ,
            PRODUCT_DETAILS_FAIL,

            PRODUCT_DELETE_REQUEST,
            PRODUCT_DELETE_SUCCESS,
            PRODUCT_DELETE_FAIL,

            PRODUCT_CREATE_REQUEST,
            PRODUCT_CREATE_SUCCESS,
            PRODUCT_CREATE_FAIL,
            PRODUCT_CREATE_RESET,

            PRODUCT_UPDATE_REQUEST,
            PRODUCT_UPDATE_SUCCESS,
            PRODUCT_UPDATE_FAIL,
            PRODUCT_UPDATE_RESET,

           
            PRODUCT_TOP_REQUEST,
            PRODUCT_TOP_SUCCESS,
            PRODUCT_TOP_FAIL

        } from './constants/productConstants'



export const productListReducer = (state = {products : []} , action ) =>{
    switch(action.type) {
        case PRODUCT_LIST_REQUEST: 
        //it will go to productActions file and action.type to type as PRODUCT_LIST_REQUEST
            return { loading : true , products : [] }

        case PRODUCT_LIST_SUCCESS : 
            return {
                loading : false,
                products : action.payload.products,
                pages:action.payload.pages,
                page:action.payload.page


             }
        
        case PRODUCT_LIST_FAIL : 
            return {  loading : false , error : action.payload } 
        default :
            return state
    }
}

// in order to use this reducer we have to add this reducer in the store 
// import this file in store file 

// in product screen we get only one product so initial state product is empty object
export const productDetailsReducer = (state = {product : { reviews: []}}, action) => {

    switch(action.type) {
        case PRODUCT_DETAILS_REQUEST: 
        //it will go to productActions file and action.type to type as PRODUCT_LIST_REQUEST
            return { loading : true , ...state }

        case PRODUCT_DETAILS_SUCCESS : 
            return {loading : false, product : action.payload }
        
        case PRODUCT_DETAILS_FAIL : 
            return {  loading : false , error : action.payload } 
        default :
            return state
    }

}

export const productDeleteReducer = (state = {}, action) => {

    switch(action.type) {
        case PRODUCT_DELETE_REQUEST: 
        //it will go to productActions file and action.type to type as PRODUCT_LIST_REQUEST
            return { loading : true }

        case PRODUCT_DELETE_SUCCESS : 
            return {loading : false, success: true }
        
        case PRODUCT_DELETE_FAIL : 
            return {  loading : false , error : action.payload } 
        default :
            return state
    }

}

export const createProductReducer = (state = {} , action ) =>{
    switch(action.type) {
        case PRODUCT_CREATE_REQUEST: 
        //it will go to productActions file and action.type to type as PRODUCT_LIST_REQUEST
            return { loading : true  }

        case PRODUCT_CREATE_SUCCESS : 
            return {loading : false, success: true , product : action.payload }
        
        case PRODUCT_CREATE_FAIL : 
            return {  loading : false , error : action.payload } 
        
        case PRODUCT_CREATE_RESET : 
            return { } 
        default :
            return state
    }
}

export const updateProductReducer = (state = {product : {}} , action ) =>{
    switch(action.type) {
        case PRODUCT_UPDATE_REQUEST: 
       
            return { loading : true  }

        case PRODUCT_UPDATE_SUCCESS : 
            return {loading : false, success: true , product : action.payload }
        
        case PRODUCT_UPDATE_FAIL : 
            return {  loading : false , error : action.payload } 
        
        case PRODUCT_UPDATE_RESET : 
            return { product:{}} 
        default :
            return state
    }
}


export const ProductTopReducer = (state = {products : []} , action ) =>{
    switch(action.type) {
        case PRODUCT_TOP_REQUEST: 
       
            return { loading : true, products:[]  }

        case PRODUCT_TOP_SUCCESS : 
            return {loading : false, products : action.payload }
        
        case PRODUCT_TOP_FAIL : 
            return {  loading : false , error : action.payload } 
        
        
        default :
            return state
    }
}