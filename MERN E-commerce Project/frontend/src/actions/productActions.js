import axios from 'axios'
import {PRODUCT_LIST_REQUEST , 
    PRODUCT_LIST_SUCCESS ,
    PRODUCT_LIST_FAIL ,

    PRODUCT_DETAILS_REQUEST , 
    PRODUCT_DETAILS_SUCCESS ,
    PRODUCT_DETAILS_FAIL,

    PRODUCT_DELETE_REQUEST,
    PRODUCT_DELETE_SUCCESS,
    PRODUCT_DELETE_FAIL,

    PRODUCT_CREATE_REQUEST,
    PRODUCT_CREATE_SUCCESS,
    PRODUCT_CREATE_FAIL,

    PRODUCT_UPDATE_REQUEST,
    PRODUCT_UPDATE_SUCCESS,
    PRODUCT_UPDATE_FAIL,

    PRODUCT_TOP_REQUEST,
    PRODUCT_TOP_SUCCESS,
    PRODUCT_TOP_FAIL
  
} from '../reducers/constants/productConstants';

//action creators                        //dispatch is used to dispatch the the actions
export const listProducts = (keyword='' , pageNumber='') =>  async (dispatch)  =>{ 

    try {
        // 1 st step dispatch PRODUCT_LIST_REQUEST
        dispatch({type : PRODUCT_LIST_REQUEST})
        //from productReducer file 

        // 2nd step dispatch PRODUCT_LIST_SUCCESS
        // here we will make request
        const {data  } = await axios.get(`/api/products?keyword=${keyword}&pageNumber=${pageNumber}`)

        dispatch({
            type : PRODUCT_LIST_SUCCESS,
            payload : data
        })

    } catch (error) {

        // 3rd step dispatch PRODUCT_LIST_FAIL
        dispatch({
            type: PRODUCT_LIST_FAIL,
            payload : error.response && error.response.data.message 
            ? 
            error.response.data.message
            :
            error.message
        })
    }

}

// creates the listProducts actions 

// we need to fire this action off in our home Screen component

//**************************************************************************************************************/

// actions to get product details i.e in Product screen make request to backend

export const listProductDetails = (id) => async (dispatch) => {
    try {

          // 1 st step dispatch PRODUCT_LIST_REQUEST
          dispatch({type : PRODUCT_DETAILS_REQUEST})

          // 2nd step dispatch PRODUCT_LIST_SUCCESS

          const {data} = await axios.get(`/api/products/${id}`)
          dispatch({
            type : PRODUCT_DETAILS_SUCCESS,
            payload : data
          })

        
    } catch (error) {
          // 3rd step dispatch PRODUCT_LIST_FAIL
          dispatch({
            type: PRODUCT_DETAILS_FAIL,
            payload : error.response && error.response.data.message 
            ? 
            error.response.data.message
            :
            error.message
        })
    }
}

export const productDelete = (id) => async (dispatch , getState) => {
    try {

          
          dispatch({type : PRODUCT_DELETE_REQUEST})

        
          const {userLogin : {userInfo}} = getState()
          const config = {
              headers : {
               
                  Authorization : `Bearer ${userInfo.token}`
              }
          }

        await axios.delete(`/api/products/${id}`,config)
          dispatch({
            type : PRODUCT_DELETE_SUCCESS
            
          })

        
    } catch (error) {
       
          dispatch({
            type: PRODUCT_DELETE_FAIL,
            payload : error.response && error.response.data.message 
            ? 
            error.response.data.message
            :
            error.message
        })
    }
}

export const createProduct = () => async (dispatch , getState) => {
    try {         
          dispatch({type : PRODUCT_CREATE_REQUEST})        
          const {userLogin : {userInfo}} = getState()
          const config = {
              headers : {
                'content-type' : 'application/json',
                  Authorization : `Bearer ${userInfo.token}`
              }
          }
      const {data} =  await axios.post(`/api/products`, {} ,config)
          dispatch({
            type : PRODUCT_CREATE_SUCCESS,
            payload : data
            
          })        
    } catch (error) {
       
          dispatch({
            type: PRODUCT_CREATE_FAIL,
            payload : error.response && error.response.data.message 
            ? 
            error.response.data.message
            :
            error.message
        })
    }
}

export const productUpdate = (product) => async (dispatch , getState) => {
    try {         
          dispatch({type : PRODUCT_UPDATE_REQUEST})        
          const {userLogin : {userInfo}} = getState()
          const config = {
              headers : {
                'content-type' : 'application/json',
                  Authorization : `Bearer ${userInfo.token}`
              }
          }
      const {data} =  await axios.put(`/api/products/${product._id}`, product ,config)
          dispatch({
            type : PRODUCT_UPDATE_SUCCESS,
            payload : data
            
          })        
    } catch (error) {
       
          dispatch({
            type: PRODUCT_UPDATE_FAIL,
            payload : error.response && error.response.data.message 
            ? 
            error.response.data.message
            :
            error.message
        })
    }
}

export const listTopProducts = () =>  async (dispatch)  =>{ 

    try {
        // 1 st step dispatch PRODUCT_LIST_REQUEST
        dispatch({type : PRODUCT_TOP_REQUEST})
        //from productReducer file 

        // 2nd step dispatch PRODUCT_LIST_SUCCESS
        // here we will make request
        const {data  } = await axios.get(`/api/products/top`)
        console.log(data)
        dispatch({
            type : PRODUCT_TOP_SUCCESS,
            payload : data
        })

    } catch (error) {

        // 3rd step dispatch PRODUCT_LIST_FAIL
        dispatch({
            type: PRODUCT_TOP_FAIL,
            payload : error.response && error.response.data.message 
            ? 
            error.response.data.message
            :
            error.message
        })
    }

}