import express from 'express'
const router = express.Router()
import {loginUser, getUserProfile , registerUser , editUserProfile, getUsers , deleteUser , getUserById , updateUser} from '../controllers/userController.js'
import {protect ,admin} from '../middleware/authMiddleware.js'


router.post('/register' , registerUser ) 

router.post('/login' , loginUser ) 

router.get('/getUsers',protect , admin , getUsers)
router.get('/getUsers/:id',protect , admin , getUserById)
router.put('/updateUsers/:id', protect , admin ,updateUser)
router.delete('/deleteUser/:id', protect , admin , deleteUser)


router.route('/profile')
            .get(protect , getUserProfile)
            .put(protect , editUserProfile)


export default router

