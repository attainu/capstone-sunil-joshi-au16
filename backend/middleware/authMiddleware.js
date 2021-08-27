//validate the token
import jwt from 'jsonwebtoken'
import asyncHandler from 'express-async-handler'
import User from '../model/userModel.js'

const protect = asyncHandler( async (req, res ,next) => {
    let token 

   if(req.headers.authorization && req.headers.authorization.startsWith('Bearer') )
   {
       try {
           
        token = req.headers.authorization.split(' ')[1]

        const decoded = jwt.verify(token , process.env.JWT_SECRET)
        // console.log(decoded)
        // console.log(decoded.id)
        req.user = await User.findById(decoded.id).select('-password')
        // we dont want to return the password so select('-password) is written
        // console.log("req.user",req.user)
  
        next()

       } catch (error) {
           console.log(error)
           res.status(401)
           throw new Error('not authorized token failed')
       }
   }

   if(!token){
       res.status(401)
       throw new Error('not authorized , no token')
   }
  
}
)


const admin = (req,res,next) => {
    if(req.user && req.user.isAdmin) {
        next()
    }else{
        res.status(401)
        throw new Error('not authorized as admin ')
    }
}

export {protect, admin} 