import mongoose from 'mongoose'

const orderSchema = new mongoose.Schema({

    user: {
        type : mongoose.Schema.Types.ObjectId, // order is made by users so we need user in order schema
                                                // to connect one to schema with another 
                                                //type : mongoose.Schema.Types.ObjectId should be used
                                                // ref : 'User' , will connect to that User model 
        required : true, 
        ref : 'User'  // reference to the user model
    },
    orderItems : [
        {
           name : {type : String,required : true},
           qty : {type : Number,required : true},
           image :  {type : String,required : true},
           price : {type : Number,required : true},
           product : {
               type : mongoose.Schema.Types.ObjectId ,
               required : true, 
               ref : 'Product'
           }         
        }
    ],
    shippingAddress : {
        name : {type: String , required : true},
        phone : {type : Number ,required : true},
        address : {type : String,required : true},
        city : {type : String,required : true},
        postalCode : {type : Number,required : true},
        country : {type : String,required : true}
    },
    paymentMethod : {
        type :String,required : true
    },
    paymentResult  : {
        id: { type: String},
        status: { type: String},
        updated_time: { type: String},
        email_address: { type: String}
    },
    taxPrice: {
        type :Number,
        required : true ,
        default : 0.0
    },
    shippingPrice: {
        type :Number,
        required : true ,
        default : 0.0
    },
    totalPrice: {
        type :Number,
        required : true ,
        default : 0.0
    },
    isPaid: {
        type :Boolean,
        required : true ,
        default : false
    },
    paidAt: {
        type : Date, 
    },
    isDelivered:{
        type :Boolean,
        required : true ,
        default : false
    },
    deliveredAt: {
        type: Date,
      }


},
{
    timestamps: true,
}

)


const Order = mongoose.model('order',orderSchema)

export default Order