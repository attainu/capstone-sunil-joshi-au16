import mongoose from 'mongoose'

const reviewSchema = new mongoose.Schema({
    name : {type : String,required : true} ,
    rating : {type : Number ,required : true} ,
    comments : {type : String,required : true}
},{
    timestamps : true
})


// only admin can add products 
const productSchema = new mongoose.Schema({
    user : {
        type : mongoose.Schema.Types.ObjectId,
        required : true, 
        ref : 'User'
    },

    name : {
        type : String,
        required : true
    },

    image :{
        type : String,
        required : true
    },
    brand : {
        type :String,
        required : true
    },
    category : {
        type : String,
        required : true
    },
    description : {
        type : String,
        required : true
    },
    reviews : [reviewSchema]  // there will multiple reviews for a product , 
                            //so it will be store in the form fo array
                            // as it is a small schema it will be defined here only 
    ,
    rating : {
        type : Number,
        required : true, 
        default : 0
    },
    numReviews : {
        type : Number,
        required : true, 
        default : 0
    },
    price : {
        type : Number,
        required : true, 
        default : 0
    },
    countInStock : {
        type : Number,
        required : true, 
        default : 0
    },
    

}
,{
    timestamps : true
})

const Product = mongoose.model('Product' , productSchema)

export default Product