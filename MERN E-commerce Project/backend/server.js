import express from 'express';
import dotenv  from 'dotenv';
dotenv.config({path:'../.env'})
import ConnectDB from './config/db.js'
import colors from 'colors'
import {notFound ,errorHandler} from './middleware/errorMiddleware.js'
import path from 'path'
import morgan from 'morgan'


const app = express()

if(process.env.NODE_ENV ==='development'){
    app.use(morgan('dev'))

}

const port = process.env.PORT 

app.use(express.json())
// database connection
ConnectDB()

import productRoutes from './routes/productRoutes.js'
import userRoutes from './routes/userRoutes.js'
import orderRoutes from './routes/orderRoutes.js'
import uploadRoutes from './routes/uploadRoutes.js'

app.use('/api/products', productRoutes)
app.use('/api/users' , userRoutes)
app.use('/api/orders', orderRoutes)

//upload image route
app.use('/api/upload', uploadRoutes)

//upload image directory path
const __dirname = path.resolve()
app.use('/uploads', express.static(path.join(__dirname, '/uploads')))


app.get('/api/config/paypal', (req,res) => res.send(process.env.PAYPAL_CLIENT_ID))

if(process.env.NODE_ENV === 'production'){
    app.use(express.static(path.join(__dirname , `/frontend/build`)))
    app.get('*',(req, res)=>res.sendFile(path.resolve(__dirname,'frontend','build','index.html'))
    )
}else {
        app.get('/',(req, res)=>{
            res.send('api is running')
})
}
// middlewares

app.use(notFound)
app.use(errorHandler)



app.listen(port , ()=>{
    console.log(`server is running on port ${port}`.yellow.bold)
})