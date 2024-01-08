import mongoose from "mongoose";
const offlineDb = 'mongodb://localhost:27017/blogDb'

const connectDB = async () => {
    try{
        const connection =  await mongoose.connect(process.env.MONGO_URI);
        console.log(`Mongodb connected: ${connection.connection.host}`);
    } catch(err){
        console.error(err);
        process.exit(1);
    }
}

export default connectDB;