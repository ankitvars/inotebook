const mongoose = require("mongoose");
const mongoURI = "mongodb://127.0.0.1:27017/iNotebook";

const connectToMongo = async () => {
  mongoose.connect(mongoURI).then(() => {
    console.log("Connected to MongoDB successfull!");
  });
};

module.exports = connectToMongo;
