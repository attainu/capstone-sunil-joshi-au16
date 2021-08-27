import React , {  useEffect}from 'react'
import {Table,ListGroup } from 'react-bootstrap'
import {useDispatch , useSelector} from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import {FaTimes,FaCheck} from 'react-icons/fa';
import { FcViewDetails } from 'react-icons/fc';
//_actions
import {allTheOrders} from '../actions/orderActions'


const AllorderListScreen = ({ history}) => {
    const dispatch = useDispatch()

    // get users state
    const  allOrders  = useSelector((state)=> state.allOrders )
    const {loading , orders , error} = allOrders 
   
    const  userLogin = useSelector((state)=> state.userLogin)
    const {userInfo} = userLogin

    console.log(orders)

    useEffect(()=>{
        if(userInfo && userInfo.isAdmin){
            dispatch(allTheOrders())
        }else{
            history.push('/login')
        }
       
    },[dispatch , history , userInfo])


    return (
        <div className="container" style={{paddingLeft:'10px'}} >
        <h1>Orders</h1>
        {loading ? <Loader/> : error ? <Message variant ='danger' >{error}</Message> : (
            <Table striped bordered hover responsive className="table-sm">
                <thead>
                    <tr>
                        {/* table headings */}
                        <th>ID</th> 
                        <th>USER</th> 
                        <th>ITems</th>
                        <th>DATE</th> 
                        <th>TOTAL</th> 
                        <th>PAID</th>
                        <th>DELIVERED</th>
                        <th>DETAILS</th>

                    </tr>
                </thead>

                <tbody>
                    {
                        orders.map((order) => (
                            <tr  key= {order._id}>
                                <td>{order._id}</td>
                                <td>{order.user && order.user.name}</td>

                                <td>{order.orderItems.map((item , index) => (
                                  <ListGroup.Item key={index} >
                                            <p >{item.name.split(':')} : </p>  
                                  </ListGroup.Item>
                              ))}</td>


                                <td>{order.createdAt.substring(0,10)}</td>
                               <td> {order.totalPrice}</td>
                                <td>{
                                
                                order.isPaid 
                                         ?
                                 (<FaCheck size='2rem' style={{color : 'green'}}/>) 
                                        : 
                                 (<FaTimes size='2rem' style={{color : 'red'}} />) 

                                 }</td>


                            <td>{   
                                
                                order.isDelivered 
                                         ?
                               
                                         (<FaCheck size='2rem' style={{color : 'green'}}/>) 
                              
                                        : 
                                 (<FaTimes size='2rem' style={{color : 'red'}} />) 

                                 }</td>

                                 <td>
                               
                                   <a style={{textDecoration: 'none'}} href={`/order/${order._id}`}variant='light' > 
                                   <  FcViewDetails size='2rem' />
                                   </a> 
                                     
                                 </td>

                              


                            </tr>
                        ))
                    }
                </tbody>
            </Table>
        ) }
            
        </div >
    )
}

export default AllorderListScreen
