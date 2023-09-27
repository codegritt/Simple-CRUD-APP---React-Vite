import mongoose from "mongoose";

const connectToMongo = async () => {
  try {
    const res = await mongoose.connect(
      "mongodb+srv://gokul:gokul@eventsdb.d45qs.mongodb.net/"
    );
    if (res) {
      console.log("connected successfully");
    }
  } catch (error) {
    console.log(error);
  }
};

export default connectToMongo;
