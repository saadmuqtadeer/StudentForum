import mongoose from "mongoose";
import colors from "colors";

const ConnectDB = async () => {
    try{
        const conn = await mongoose.connect(process.env.MONGODB_URL);
        console.log(`Connected to MongoDB Database ${conn.connection.host}`.bgMagenta.white);
    }catch(error){
        console.log(`Error in MongoDB ${error}`.bgRed.white);
    }
}

export default ConnectDB;