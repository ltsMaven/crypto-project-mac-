const express = require("express");
const mongoose = require("mongoose");
const finnhub = require('finnhub');
const Stock = require("../models/stocks");
const router = express.Router();


const api_key = finnhub.ApiClient.instance.authentications['api_key'];
api_key.apiKey = 'csccqd9r01qgt32f7ongcsccqd9r01qgt32f7oo0';
const finnhubClient = new finnhub.DefaultApi();


router.get('/finnhub/quote/:symbol', (req, res) => {
    const { symbol } = req.params;
  
    finnhubClient.quote(symbol, (error, data, response) => {
      if (error) {
        console.error('Error fetching stock quote:', error);
        res.status(500).json({ error: 'Failed to fetch stock quote' });
      } else {
        res.json(data);
      }
    });
  });

router.post("/buy", async function (req, res) {
  try {
    const symbol = req.body.symbol;
    const price = req.body.price;
    const units = req.body.units;

    const newStock = new Stock({
      _id: new mongoose.Types.ObjectId(),
      symbol: symbol,
      price: price,
      units: units,
    });

    const savedStock = await newStock.save();
    res.json({
        id: savedStock._id,
        symbol: savedStock.symbol,
    })
  } catch (err) {
    console.error("error adding stock");
    res.status(500).json({ error: "An error when the user try to add stock" });
  }
});



router.get("/getStocks", async function (req, res) {
  const stocksDB = await Stock.find();
  res.json(stocksDB);
});

router.delete("/delete/:id", async function (req, res) {
  const stocksId = req.params.id;
  const deletionResult = await Stock.findById(stocksId);
  const result = await deletionResult.deleteOne();
  res.json({
    acknowledge: result.acknowledged,
  });
});

module.exports = router;