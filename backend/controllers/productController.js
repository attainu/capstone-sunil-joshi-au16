import express from 'express'
import Product from '../model/productModel.js'
import asyncHandler from 'express-async-handler'


// description : get all products
// route : GET request to /api/products
//access : public
const getProducts = asyncHandler(async (req, res) => {
    const pageSize = 4
    const page = Number(req.query.pageNumber) || 1

    const keyword = req.query.keyword ? {
        name: {
            $regex : req.query.keyword,
            $options :'i'
        }
    }:{}

    const count = await Product.countDocuments({...keyword})
    const products = await Product.find({...keyword}).limit(pageSize).skip(pageSize * (page-1))
    res.json({products, page , pages: Math.ceil(count/pageSize)})
}) 

// description : get single product bt id
// route : GET request to /api/products/:id
//access : public
const getProductById = asyncHandler(async (req,res) => {
    const product = await Product.findById(req.params.id)
    if(product){
        res.json(product)
    }else{
        res.status(404)
        throw new Error('Product not found')
    }
})


// description : delete a product
// route : DELETE request to /api/products/:id
//access : private/admin
const deleteProduct = asyncHandler(async (req,res) => {
    const product = await Product.findById(req.params.id)
    if(product){

       await product.remove()
       res.json({msg : "product deleted"})
    }else{
        res.status(404)
        throw new Error('Product not found')
    }
})


// description : create product
// route : DELETE request to /api/products
//access : private/admin
const createProduct = asyncHandler(async (req,res) => {
  const product = new Product({
      name : 'Sample Name',
      price : 0,
      user : req.user._id,
      image: '/images/sample.jpg',
      brand : 'Sample Brand',
      category : 'Sample category',
      countInStock : 0,
      numReviews : 0,
      description : 'Sample Description'

  })
  
  const createdProduct = await product.save()
  res.status(201).json(createdProduct)
})

// description : update product
// route : put request to /api/products/:id
//access : private/admin
const updateProduct = asyncHandler(async (req,res) => {
    const { name ,
        price ,
        description , 
        image ,
         brand , 
         category , 
         countInStock} = req.body

     const product = await Product.findById(req.params.id)  

  if(product){
      product.name = name
      product.price  =  price 
      product.description =description
      product.image  = image 
      product.brand = brand
      product.category = category
      product.countInStock =countInStock

    const updatedProduct = await product.save()
    res.status(201).json(updatedProduct)
  }else{
    res.status(404)
    throw new Error('Product did not update')
  }
    
  })

// description : GET top products
// route : put request to /api/products/top
//access : public

const getTopProducts = asyncHandler(async (req, res) => {
    const products = await Product.find({}).sort({rating:-1}).limit(3)
    
    res.json(products)
})


export{ getProducts , getProductById , deleteProduct, createProduct ,  updateProduct , getTopProducts} 
