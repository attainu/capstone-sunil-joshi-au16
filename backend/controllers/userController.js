import generateToken from '../utils/generateToken.js'
import User from '../model/userModel.js'
import asyncHandler from 'express-async-handler'





// description : register a new user
// route :POST request to /api/users/register
//access : public
const registerUser = asyncHandler(async (req, res) => {
    const {name , email, password} =  req.body

    const userExists = await User.findOne({email : email})
   
  if(userExists){
      res.status(400)
      throw new Error('User Already Exists')
  }

  const user = await User.create({
      name ,
      email,
       password
  })

  if(user){
      res.status(201).json({
          _id : user._id, 
          name : user.name, 
          email : user.email,
          isAdmin : user.isAdmin,
          token : generateToken(user._id)
      })
  }else{
      res.status(400)
      throw new Error('User not found')
  }
}) 




// description : Auth user and get token login
// route :POST request to /api/users/login
//access : public
const loginUser = asyncHandler(async (req, res) => {
              const {email, password} =  req.body

              const user = await User.findOne({email : email})
             
              if(user && (await user.matchPassword(password))) {
                res.json({
                    _id: user.id,
                    name: user.name,
                    email : user.email ,
                    isAdmin : user.isAdmin,
                    token : generateToken(user._id)
                })
              }else{
                  res.status(401)
                  throw new Error('invalid email or password' )
              }
}) 


// description : get user profile
// route : GET request to /api/users/profile
//access : private
const getUserProfile = asyncHandler(async (req, res) => {
    
  const user = await User.findById(req.user._id)

  if(user){
      res.json({
        _id: user.id,
        name: user.name,
        email : user.email ,
        isAdmin : user.isAdmin,
      })

  }else{
      res.status(401)
      throw new Error('user not found')
  }
})

// description : update user profile
// route : PUT request to /api/users/profile
//access : private
const editUserProfile = asyncHandler(async (req, res) => {
    
  const user = await User.findById(req.user._id)

  if(user){
     user.name = req.body.name || user.name, 
     user.email = req.body.email || user.email
    if(req.body.password) {
         user.password = req.body.password
     }
     
     const updateUser = await user.save()

     res.json({
        _id: updateUser.id,
        name: updateUser.name,
        email :updateUser.email ,
        isAdmin : updateUser.isAdmin,
        token : generateToken(updateUser._id)
    })

  }else{
      res.status(401)
      throw new Error('user not found')
  }
})


// description : get all users
// route : GET request to /api/users
//access : private/admin
const getUsers = asyncHandler(async (req, res) => {
 const users = await User.find({})
 res.json(users)
})


// description : delete a user
// route : DELETE request to /api/users
//access : private/admin
const deleteUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id)
    if(user){
        await user.remove()
        res.json({msg: 'user deleted'})

    }else{
        res.status(401)
        throw new Error('user not found')
    }
    
   })


 
// description : get  user by id and update
// route : GET request to /api/users/:id
//access : private/admin
const getUserById = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id).select('-password')
    if(user){
    res.json(user)
    }
    res.status(404)
    throw new Error('User not found')
   })  


// description : update user in admin panel
// route : PUT request to /api/users/:id
//access : private/admin

const updateUser = asyncHandler(async (req, res) => {
   
    const user = await User.findById(req.params.id)

    if (user) {
      user.name = req.body.name || user.name
      user.email = req.body.email || user.email
      user.isAdmin = req.body.isAdmin 
  
      const updatedUser = await user.save()
  
      res.json({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        isAdmin: updatedUser.isAdmin,
      })

  }else{
      res.status(401)
      throw new Error('user not found')
  }
})


   

export {loginUser , getUserProfile , registerUser , editUserProfile , getUsers , deleteUser , getUserById , updateUser }