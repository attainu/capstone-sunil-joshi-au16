import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const connectDB = async () => {
  try {
    const con = await mongoose.connect(
      "mongodb+srv://demo:demo123@cluster0.7b0nj.mongodb.net/e-commerce?retryWrites=true&w=majority",
      {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        useCreateIndex: true,
      }
    );

    console.log(`Database Connected`.blue.bold);
  } catch (error) {
    console.log(`mongodb Error: ${error}`.red.underline.bold);
    process.exit(1);
  }
};

export default connectDB;
