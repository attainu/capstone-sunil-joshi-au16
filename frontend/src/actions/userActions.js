import {
    USER_LOGIN_REQUEST, 
    USER_LOGIN_SUCCESS,
    USER_LOGIN_FAIL,
    USER_LOGOUT,

    USER_REGISTER_REQUEST, 
    USER_REGISTER_SUCCESS,
    USER_REGISTER_FAIL,

    USER_DETAILS_REQUEST,
    USER_DETAILS_SUCCESS ,
    USER_DETAILS_FAIL,

    USER_UPDATE_PROFILE_REQUEST,
    USER_UPDATE_PROFILE_SUCCESS,
    USER_UPDATE_PROFILE_FAIL,

    
    USER_LIST_REQUEST ,
    USER_LIST_SUCCESS ,
    USER_LIST_FAIL ,

    USER_LIST_RESET,

    USER_DELETE_REQUEST,
    USER_DELETE_SUCCESS,
    USER_DELETE_FAIL,

    ADMIN_USER_DETAILS_REQUEST ,
    ADMIN_USER_DETAILS_SUCCESS ,
    ADMIN_USER_DETAILS_FAIL ,

    UPDATE_ADMIN_USER_DETAILS_REQUEST,
    UPDATE_ADMIN_USER_DETAILS_SUCCESS,
    UPDATE_ADMIN_USER_DETAILS_FAIL



} from '../reducers/constants/userConstants.js'



import axios from 'axios'

export const login = (email ,password) => async (dispatch) => {
    try {
        // dispatch the request 
        dispatch({
            type : USER_LOGIN_REQUEST
        })

        const config = {
            headers : {
                'content-type' : 'application/json'
            }
        }

        const {data} = await axios.post('/api/users/login', {email , password} , config)

        dispatch({
            type : USER_LOGIN_SUCCESS,
            payload : data
        })

        localStorage.setItem('userInfo', JSON.stringify(data))

    } catch (error) { 

        dispatch({
            type: USER_LOGIN_FAIL,
            payload : error.response && error.response.data.message 
            ? 
            error.response.data.message
            :
            error.message
        })
        
    }
}

export const logout = () =>  async (dispatch)  => {
    localStorage.removeItem('userInfo')
    localStorage.removeItem('cartItems')
    localStorage.removeItem('shippingAddress')
    localStorage.removeItem('paymentMethod')
    localStorage.removeItem('__paypal_storage__')
    localStorage.removeItem('tokenStore')
    window.location.href = '/'
    
    dispatch({type : USER_LIST_RESET})
    dispatch({type: USER_LOGOUT})
}


// register wil take name, email , password
export const register = (name ,email , password) => async (dispatch)  => {
    try {
        
        dispatch({
            type: USER_REGISTER_REQUEST
        })

        const config = {
            headers : {
                'content-type' : 'application/json'
            }
        }

        const {data} = await axios.post('/api/users/register',{name , email , password} , config)
        dispatch({
            type : USER_REGISTER_SUCCESS,
            payload: data
        })

        dispatch({
            type : USER_LOGIN_SUCCESS,
            payload: data
        })

        localStorage.setItem('userInfo', JSON.stringify(data))

    } catch (error) {
        dispatch({
            type: USER_REGISTER_FAIL,
            payload : error.response && error.response.data.message 
            ? 
            error.response.data.message
            :
            error.message
        })
    }
}

export const profile = (id ) => async (dispatch , getState)  => {
    try {
        
        dispatch({
            type: USER_DETAILS_REQUEST
        })

        const {userLogin : {userInfo}} = getState()
        const config = {
            headers : {
                'content-type' : 'application/json', 
                Authorization : `Bearer ${userInfo.token}`
            }
        }

        const {data} = await axios.get(`/api/users/${id}`, config)
        dispatch({
            type : USER_DETAILS_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: USER_DETAILS_FAIL,
            payload : error.response && error.response.data.message 
            ? 
            error.response.data.message
            :
            error.message
        })
    }
}

export const UpdateProfile = (user) => async (dispatch , getState)  => {
    try {
        
        dispatch({
            type: USER_UPDATE_PROFILE_REQUEST
        })

        const {userLogin : {userInfo}} = getState()
        const config = {
            headers : {
                'content-type' : 'application/json', 
                Authorization : `Bearer ${userInfo.token}`
            }
        }

        const {data} = await axios.put(`/api/users/profile`,user, config)
        dispatch({
            type : USER_UPDATE_PROFILE_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: USER_UPDATE_PROFILE_FAIL,
            payload : error.response && error.response.data.message 
            ? 
            error.response.data.message
            :
            error.message
        })
    }
}

export const getAllUsers = () => async (dispatch , getState)  => {
    try {
        
        dispatch({
            type: USER_LIST_REQUEST
        })

        const {userLogin : {userInfo}} = getState()
        const config = {
            headers : {
                
                Authorization : `Bearer ${userInfo.token}`
            }
        }

        const {data} = await axios.get(`/api/users/getUsers`, config)
        dispatch({
            type : USER_LIST_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: USER_LIST_FAIL,
            payload : error.response && error.response.data.message 
            ? 
            error.response.data.message
            :
            error.message
        })
    }
}


export const deleteOneUser = (id) => async (dispatch , getState)  => {
    try {
        
        dispatch({
            type: USER_DELETE_REQUEST
        })

        const {userLogin : {userInfo}} = getState()
        const config = {
            headers : {
                
                Authorization : `Bearer ${userInfo.token}`
            }
        }

        await axios.delete(`/api/users/deleteUser/${id}`, config)
        dispatch({
            type : USER_DELETE_SUCCESS           
        })

    } catch (error) {
        dispatch({
            type: USER_DELETE_FAIL,
            payload : error.response && error.response.data.message 
            ? 
            error.response.data.message
            :
            error.message
        })
    }
}

export const adminUserProfile = (id ) => async (dispatch , getState)  => {
    try {
        
        dispatch({
            type: ADMIN_USER_DETAILS_REQUEST
        })

        const {userLogin : {userInfo}} = getState()
        const config = {
            headers : {
               
                Authorization : `Bearer ${userInfo.token}`
            }
        }

        const {data} = await axios.get(`/api/users/getusers/${id}`, config)
        dispatch({
            type : ADMIN_USER_DETAILS_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: ADMIN_USER_DETAILS_FAIL,
            payload : error.response && error.response.data.message 
            ? 
            error.response.data.message
            :
            error.message
        })
    }
}

export const UpdateAdminUserProfile = (user) => async (dispatch , getState)  => {
    try {
        
        dispatch({
            type: UPDATE_ADMIN_USER_DETAILS_REQUEST
        })

        const {userLogin : {userInfo}} = getState()
        const config = {
            headers : {
                'content-type' : 'application/json', 
                Authorization : `Bearer ${userInfo.token}`
            }
        }

        const {data} = await axios.put(`/api/users/updateUsers/${user._id}`,user, config)
        dispatch({
            type :UPDATE_ADMIN_USER_DETAILS_SUCCESS,
           
        })

        dispatch({
            type : ADMIN_USER_DETAILS_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: UPDATE_ADMIN_USER_DETAILS_FAIL,
            payload : error.response && error.response.data.message 
            ? 
            error.response.data.message
            :
            error.message
        })
    }
}