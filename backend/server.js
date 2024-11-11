const express = require('express');
const mongoose = require('mongoose');


const app = express();
const PORT_NUMBER = 8080; 
const stocksApi = require("./routes/stocksApi");
const Stock = require("./models/stocks");
app.use(express.json());

const URL = "mongodb://127.0.0.1:27017/stocksDB";


app.use("/", stocksApi);

app.use(express.static("./dist/crypto/browser"));

async function connectDB() {
    try {
      await mongoose.connect(URL);
      return "connection successful";
    } catch (error) {
      console.error("Failed", error);
    }
  }
  
  // call the connect DB
  connectDB(URL)
    .then(console.log)
    .catch((error) => console.log(error));





app.listen(PORT_NUMBER, function () {
    console.log(`listening on port ${PORT_NUMBER}`);
    });