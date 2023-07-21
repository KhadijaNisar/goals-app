const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(
        "mongodb+srv://khadija:khadija@cluster0.evzyqa8.mongodb.net/college?retryWrites=true&w=majority",
    );
    console.log("Connected to cluster")
  } catch (error) {
    console.log(error)
  }
};

module.exports = connectDB;
