import React , {useState, useEffect}from "react";
import { Link } from "react-router-dom";
import { Row, Col, ListGroup, Card, Button , Form } from "react-bootstrap";  

import Message from "../components/Message";
import Loader from "../components/Loader";
import Meta from "../components/Meta";


// to dispatch our detail products actions we have to bring them from react-redux
import {useDispatch , useSelector} from 'react-redux'  // step 1

// to fire the actions or dispatch the actions we need to import the _actions
import {listProductDetails} from '../actions/productActions' // step 4

const ProductScreen = ({ history , match }) => {
  const [qty , setQty] = useState(1)
  const dispatch = useDispatch() // step 2

    //step 7
    // to display the product details in the productScreen we have to select it from  state so we use useSelector
    // the name used in the store  inside combineReducers
    const productDetails  = useSelector(state => state.productDetails)

    //step 8
    const {loading ,product, error } = productDetails // piece of states from productReducers

  useEffect(()=>{

  dispatch(listProductDetails(match.params.id)) // step 3 > dispatch()  , step 5 > dispatch(listProductDetails())
    
  },[dispatch , match]) // step 6 add dispatch to dependencies

  const addtoCarthandler = (e) => {
    e.preventDefault()
    history.push(`/cart/${match.params.id}?qty=${qty}`)
  }
  
  console.log(product.image)
  
  return (
    <>
      <Link className="btn btn-dark my-3" to="/">
        Back
      </Link>
      { loading ? <Loader/> : error ? <Message variant ='danger' >{error}</Message> :(
          <>
          <Meta title={product.name}  />
              <Row>
              <Col md={6}>
              <Card.Img className ='cardimg' src={product.image} variant="top" />
              </Col>

              <Col md={3}>
                <ListGroup.Item>
                  <h2>{product.name}</h2>
                </ListGroup.Item>

            

                <ListGroup.Item>
                  <h2> Price : ₹{product.price}</h2>
                </ListGroup.Item>

                <ListGroup.Item>Description :{product.description}</ListGroup.Item>
              </Col>

              <Col md={3}>
                <Card>
                  <ListGroup variant="flush">
                    <ListGroup.Item>
                      <Row>
                        <Col>Price:</Col>
                        <Col>
                          <strong>₹ {product.price}</strong>
                        </Col>
                      </Row>
                    </ListGroup.Item>

                    <ListGroup.Item>
                      <Row>
                        <Col>Status:</Col>
                        <Col>
                          <strong>
                            {product.countInStock > 0 ? "In Stock" : "Out of Stock"}
                          </strong>
                        </Col>
                      </Row>
                    </ListGroup.Item>

                    {
                      product.countInStock > 0 && (
                        <ListGroup.Item>
                          <Row>
                            <Col style={{fontSize :'3rem' }}>Qty</Col>
                            <Col>
                              <Form.Control as='select' style={{fontSize :'1.5rem' }} value={qty} onChange={(e)=> setQty(e.target.value)}>
                            { [...Array(product.countInStock).keys()].map((x) =>(
                                <option key={x+1} value={x+1} >{x+1}</option>
                              ))
                            }
                              </Form.Control>
                            </Col>
                          </Row>
                        </ListGroup.Item> 
                      )
                    }

                    <ListGroup.Item>
                      <Button
                      onClick = {addtoCarthandler}
                        className="btn-block"
                        type="button"
                        style={{
                          fontSize: "2rem",
                        }}
                        disabled={product.countInStock === 0}
                      >
                        Add to Cart
                      </Button>
                    </ListGroup.Item>
                  </ListGroup>
                </Card>
              </Col>
            </Row>
          </>
        )
       }
      
    </>
  );
};

export default ProductScreen;
