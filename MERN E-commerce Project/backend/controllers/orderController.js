import express from 'express'
import Order from '../model/orderModel.js'
import asyncHandler from 'express-async-handler'


// description : create new oder
// route : POST request to /api/orders
//access : private
const addOrderItems = asyncHandler(async (req, res) => {
    const { orderItems , 
        shippingAddress ,
         paymentMethod ,
          itemsPrice , 
          taxPrice , 
         shippingPrice ,
          totalPrice
     } = req.body
   
  
     if(!orderItems){
         res.status(400)
         throw new Error('No orderItems')
     }
         let order = new Order({
             orderItems ,
             user : req.user._id,
             shippingAddress ,
             paymentMethod ,
             itemsPrice ,
             taxPrice ,
             shippingPrice ,
             totalPrice  
     })

     const createOrder = await order.save()

     res.status(201).json(createOrder)
})


// description : get order by id
// route : get request to /api/orders/:id
//access : private
const getOrderById = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id).populate(
        'user',
        'name email')

    if(order){
        res.json(order)
    }else{
        res.status(404)
        throw new Error ('Order not found')
    }
}) 

// description : update  order to pain
// route : get request to /api/orders/:id/pay
//access : private
const updateOrderToPaid = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id)

    if(order){
       
        order.isPaid = true 
        order.paidAt = Date.now()
        order.paymentResult = {
            id: req.body.id,
            status : req.body.status,
            update_time : req.body.update_time,
            email_address : req.body.payer.email_address
        }
    const updatedOrder = await order.save()
    res.json(updatedOrder)
    }else{
        res.status(404)
        throw new Error ('Order not found')
    }
}) 

// description : Get logged in user orders
// route : get request to /api/orders/myorders
//access : private
const getMyOrders = asyncHandler(async (req, res) => {
    const orders = await Order.find({user : req.user._id})
   res.json(orders)
}) 


// description : Get all orders
// route : get request to /api/orders
//access : private/admin
const getAllOrders = asyncHandler(async (req, res) => {
    const orders = await Order.find({}).populate('user', 'id name')
   res.json(orders)
}) 

// description : update  order to delivered
// route : get request to /api/orders/:id/deliver
//access : private/admin
const updateOrderToDelivered = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id)

    if(order){
       
        order.isDelivered = true 
        order.deliveredAt = Date.now()
     
    const updatedOrder = await order.save()
    res.json(updatedOrder)
    }else{
        res.status(404)
        throw new Error ('Order not found')
    }
}) 


export {addOrderItems, getOrderById , updateOrderToPaid , getMyOrders, getAllOrders,updateOrderToDelivered}