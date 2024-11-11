const mongoose = require('mongoose');


const stockSchema = new mongoose.Schema({
    _id: mongoose.Types.ObjectId, 
    symbol: {
        type: String, 
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    units: {
        type: Number, 
        required: true
    }
});
module.exports = mongoose.model('Stock', stockSchema);