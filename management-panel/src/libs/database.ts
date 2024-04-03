import mongoose from "mongoose"

const connectDb = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI as string);
    } catch (error) {
        console.log(error);
    }
}

export default connectDb;