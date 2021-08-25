import axios from 'axios'
import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import Message from "../components/Message";
import FormContainer from "../components/FormContainer";


// from action
import { listProductDetails , productUpdate } from "../actions/productActions";
import {PRODUCT_UPDATE_RESET} from'../reducers/constants/productConstants'


const  ProductEditScreen = ({ match, history }) => {
  const productId = match.params.id;
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState('');
  const [brand, setBrand] = useState('');
  const [category, setCategory] = useState('');
  const [countInStock, setCountInStock] = useState(0);
  const [description, setDescription] = useState('');
  const [uploading ,setUploading] = useState(false);

 
  const productDetails  = useSelector((state)=> state.productDetails)
  const {loading, error ,product} = productDetails

  const updateProduct   = useSelector((state)=> state.updateProduct )
  const {loading: loadingUpdate, error : errorUpdate , success : successUpdate} = updateProduct 

console.log(product)
  useEffect(() => {
      if(successUpdate) {
          dispatch({type : PRODUCT_UPDATE_RESET})
          history.push('/admin/productlist')
      }else{

        if(!product.name || product._id !== productId ){
            dispatch(listProductDetails(productId))
          }else {
              setName(product.name)
              setPrice(product.price)
              setImage(product.image)
              setBrand(product.brand)
              setCategory(product.category)
              setCountInStock(product.countInStock)
              setDescription(product.description)
          }

      }
      
  }, [dispatch ,productId, product ,  history , successUpdate]);

  const submitHandler = (e) => {
    e.preventDefault();
   dispatch(productUpdate({
       _id : productId, 
       name ,
       price,
       image,
       brand,
       category,
       description,
       countInStock
   }))
    
  };

  const uploadFileHandle = async (e) => {
      const file = e.target.files[0]
      const formdata = new FormData()
      formdata.append('image',file)
        setUploading(true)   
        try {
            const config = {
                headers: {
                    'Content-Type' : 'multipart/form-data',
                },
            }
            const {data} = await axios.post('/api/upload',formdata ,config)
    
            setImage(data)
            setUploading(false)
        } catch (error) {
            console.error(error)
            setUploading(false)          
        }
 }


  return (
    <>
      <Link to="/admin/productlist" className="btn btn-dark my-3">
        Go back
      </Link>

      <FormContainer>
        <h1>Edit  Product</h1>
       {loadingUpdate && <Loader/>}
       {errorUpdate && <Message variant ='danger' >{errorUpdate}</Message>}
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (

            //name
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="name">
              <Form.Label> Name </Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Name"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
              ></Form.Control>
            </Form.Group>

                    
            <Form.Group controlId="price">
              <Form.Label> Price </Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter Price"
                value={price}
                onChange={(e) => {
                  setPrice(e.target.value);
                }}
              ></Form.Control>
            </Form.Group>


            <Form.Group controlId="image">
              <Form.Label> Image </Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Image"
                value={image}
                onChange={(e) => {
                  setImage(e.target.value);
                }}
              ></Form.Control>
              <br></br>
           
              <Form.File 
              id='image-file' 
              label='Choose File' 
              custom 
              onChange= {uploadFileHandle}
              ></Form.File>
               {uploading && <Loader/>}
            </Form.Group>

            <Form.Group controlId="brand">
              <Form.Label> Brand </Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Brand"
                value={brand}
                onChange={(e) => {
                  setBrand(e.target.value);
                }}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="category">
              <Form.Label> Category </Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Category"
                value={category}
                onChange={(e) => {
                  setCategory(e.target.value);
                }}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="countInStock">
              <Form.Label> Count In Stock </Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter Count In Stock"
                value={countInStock}
                onChange={(e) => {
                  setCountInStock(e.target.value);
                }}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="description">
              <Form.Label> Description </Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Description"
                value={description}
                onChange={(e) => {
                  setDescription(e.target.value);
                }}
              ></Form.Control>
            </Form.Group>
            <br></br>
            <Button type="submit" variant="primary">
           
              Update
            </Button>
          </Form>
        )}
        <br></br>
      </FormContainer>
    </>
  );
};

export default ProductEditScreen;
