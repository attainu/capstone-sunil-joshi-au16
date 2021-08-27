import React , {  useEffect}from 'react'
import {Button,Table ,Row , Col, Image} from 'react-bootstrap'
import {LinkContainer} from 'react-router-bootstrap'
import {useDispatch , useSelector} from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import {FcPlus } from 'react-icons/fc';
import {RiDeleteBin2Line } from 'react-icons/ri';
import { FaEdit } from 'react-icons/fa';
import Paginate from '../components/Paginate'
//_actions
import {listProducts , productDelete , createProduct} from '../actions/productActions'
import {PRODUCT_CREATE_RESET} from '../reducers/constants/productConstants'

const ProductListScreen = ({ history , match}) => {
    const dispatch = useDispatch()
const pageNumber  = match.params.pageNumber || 1
    // get users state
    const   productList = useSelector((state)=> state.productList)
    const {loading , products, pages, page , error} =  productList

    const  userLogin = useSelector((state)=> state.userLogin)
    const {userInfo} = userLogin

    const deleteProduct = useSelector((state)=> state.deleteProduct)
    const {loading : loadingDelete, success:successDelete , error: errorDelete} = deleteProduct

    const productCreate   = useSelector((state)=> state.productCreate  )
    const {loading : loadingCreate, success:successCreate , error: errorCreate , product:createdProduct} = productCreate  


    useEffect(()=>{
        dispatch({type:PRODUCT_CREATE_RESET})

        if(!userInfo.isAdmin){
            history.push('/login')
        }

        if(successCreate){
            history.push(`/admin/product/${createdProduct._id}/edit`)
        }else{
            dispatch(listProducts('', pageNumber))
        }
          
       
    },[dispatch , history  , userInfo , successDelete, successCreate , createdProduct,pageNumber ])

  const  removeProduct = (id) => {
    if(window.confirm('Are you sure ?')){
        dispatch(productDelete(id))
    }      
  }

  const createProductsHandler = () =>{
     dispatch(createProduct())
  }

    return (
        <>
            <Row className = 'align-items-center' >
                <Col>
                <h1  >Products</h1>
                </Col>
                <Col className='text-right' >
                    <Button className ='my-3'variant='light' onClick= {createProductsHandler} >
                     <FcPlus size='2rem' />   Create Product

                    </Button>
                </Col>

            </Row> 
        {loadingDelete && <Loader/>}
        {errorDelete && <Message variant ='danger' >{error}</Message> }

        {loadingCreate && <Loader/>}
        {errorCreate && <Message variant ='danger' >{error}</Message> }
  
        {loading ? <Loader/> : error ? <Message variant ='danger' >{error}</Message> : (
         <>   
            <Table striped bordered hover responsive className="table-sm">
                <thead>
                    <tr>
                        {/* table headings */}
                        <th>ID</th> 
                        <th>NAME</th> 
                        <th>IMAGE</th>
                        <th>PRICE</th> 
                        <th>CATEGORY</th> 
                        <th>BRAND</th>
                        <th>EDIT PRODUCT</th>
                        <th>DELETE PRODUCT</th>
                      
                    </tr>
                </thead>

                <tbody>
                    {
                        products.map(product => (
                            <tr  key= {product._id}>
                                <td>{product._id}</td>
                                <td>{product.name}</td>
                                <td>
                                    <Image style={{height: '5rem' , width:'5rem'}} src={product.image}  fluid rounded></Image>
                                    
                                </td>
                                <td>₹{product.price}</td>
                                <td>{product.category}</td>
                                <td>{product.brand}</td>
                             

                                 <td>
                                     <LinkContainer to={`/admin/product/${product._id}/edit`}>
                                         <Button variant='light' className='btn-sm' >
                                             <FaEdit  size= '2rem' />
                                         </Button>
                                     </LinkContainer>
                                     
                                 </td>

                                 <td>
                                 <Button variant='danger' className='btn-sm' onClick={()=> removeProduct(product._id) } >
                                             <RiDeleteBin2Line  size='2rem' />
                                         </Button>
                                 </td>


                            </tr>
                        ))
                    }
                </tbody>
            </Table>
            <div className='paginate'>
                 <Paginate pages={pages} page={page} isAdmin={true} />
            </div>
            
        </>
        ) }
            
        </>
    )
}

export default ProductListScreen
