import React , {  useEffect}from 'react'
import {Button,Table } from 'react-bootstrap'
import {LinkContainer} from 'react-router-bootstrap'
import {useDispatch , useSelector} from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import {FaTimes, FaUserCheck , FaUserEdit } from 'react-icons/fa';
import {TiUserDelete } from 'react-icons/ti';
//_actions
import {getAllUsers , deleteOneUser} from '../actions/userActions'

const UserlistScreen = ({ history}) => {
    const dispatch = useDispatch()

    // get users state
    const  getUsers = useSelector((state)=> state.getUsers)
    const {loading , users , error} = getUsers

    const  userLogin = useSelector((state)=> state.userLogin)
    const {userInfo} = userLogin

    const  deleteUser = useSelector((state)=> state.deleteUser)
    const {success : successDelete} = deleteUser
    

    useEffect(()=>{
        if(userInfo && userInfo.isAdmin){
            dispatch(getAllUsers())
        }else{
            history.push('/login')
        }
       
    },[dispatch , history , successDelete , userInfo])

  const  deleteuser = (id) => {
    if(window.confirm('Are you sure ?')){
        dispatch(deleteOneUser(id))
    }      
  }

    return (
        <>
        <h1>Users</h1>
        {loading ? <Loader/> : error ? <Message variant ='danger' >{error}</Message> : (
            <Table striped bordered hover responsive className="table-sm">
                <thead>
                    <tr>
                        {/* table headings */}
                        <th>ID</th> 
                        <th>NAME</th> 
                        <th>EMAIL</th> 
                        <th>ADMIN</th> 
                        <th>Edit User</th>
                        <th>Delete User</th>
                    </tr>
                </thead>

                <tbody>
                    {
                        users.map(user => (
                            <tr  key= {user._id}>
                                <td>{user._id}</td>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{
                                
                                user.isAdmin 
                                         ?
                                 (<FaUserCheck size='2rem' style={{color : 'green' }}/>) 
                                        : 
                                 (<FaTimes size='2rem' style={{color : 'red'}} />) 

                                 }</td>

                                 <td>
                                     <LinkContainer to={`/admin/user/${user._id}/edit`}>
                                         <Button variant='light' className='btn-sm' >
                                             <FaUserEdit  size= '2rem' />
                                         </Button>
                                     </LinkContainer>
                                     
                                 </td>

                                 <td>
                                 <Button variant='danger' className='btn-sm' onClick={()=> deleteuser(user._id) } >
                                             <TiUserDelete size='2rem' />
                                         </Button>
                                 </td>


                            </tr>
                        ))
                    }
                </tbody>
            </Table>
        ) }
            
        </>
    )
}

export default UserlistScreen
