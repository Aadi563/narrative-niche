import mongoose from "mongoose";

const connectToDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI + "/" + process.env.DB_NAME);
    console.log("Database connected successfully!");
  } catch (error) {
    console.error(error);
  }
};

export default connectToDatabase;
