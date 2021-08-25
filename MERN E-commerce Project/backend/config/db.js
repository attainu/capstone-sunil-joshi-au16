import mongoose from 'mongoose'
import dotenv  from 'dotenv';
dotenv.config()

const connectDB = async () =>{
    try {
        const con = await mongoose.connect('mongodb+srv://chinmay:admin@cluster0.pbis5.mongodb.net/E-Angadi?retryWrites=true&w=majority' , {
            useUnifiedTopology : true, 
            useNewUrlParser : true , 
            useCreateIndex : true ,
        })

        console.log(`Database Connected`.blue.bold)

    } catch (error) {
      
        console.log(`mongodb Error: ${error}`.red.underline.bold)
        process.exit(1)
    }
}

export default connectDB