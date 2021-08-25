import React , {useEffect}from "react";
import {Link} from "react-router-dom";
import { Row, Col } from "react-bootstrap";
import Product from "../components/Product";
import Message from "../components/Message";
import Loader from "../components/Loader";
import Paginate from "../components/Paginate";
import ProductCarosal from "../components/ProductCarosal";
import Meta from "../components/Meta";

// to dispatch our list products actions we have to bring them fro react-redux
import {useDispatch , useSelector} from 'react-redux'
// to fire the actions or dispatch the actions we need to import the _actions
import {listProducts} from '../actions/productActions'


const HomeScreens = ({match}) => {

  const keyword = match.params.keyword
  const pageNumber = match.params.pageNumber || 1
  const dispatch = useDispatch()

  // to display the products in the homeScreen we have to select it from  state so we use useSelector
  // the name used in the store  inside combineReducers
  const productList  = useSelector(state => state.productList)

  const {loading ,products,page , pages, error } = productList  // piece of states from productReducers

    // useEffect makes  the request to backend to get products
    useEffect(()=> {
        dispatch(listProducts(keyword, pageNumber))
    },[dispatch, keyword , pageNumber])

  return (
    <>
    <Meta />

     {!keyword ? <ProductCarosal/> : <Link to='/' className='btn btn-dark' >Go Back</Link> }  
      
      {loading ? <Loader/> : error ? <Message variant ='danger' >{error}</Message>
       :(
         <>
        <Row>
            { (products.map( (product , key) => 
                  (
                      <Col key={key} sm={12} md={6} lg={4} xl={3}>
                        <Product product={product} />
                      </Col>
                  ) 
                )
              )
            }
        </Row>
        <div className='paginate' >
            <Paginate pages={pages} page={page} keyword={keyword ? keyword : ''}/>
        </div>
        
        </>
        ) }
      
    </>
  );
};

export default HomeScreens;
