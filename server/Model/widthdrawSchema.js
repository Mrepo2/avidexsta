

const mongoose = require('mongoose');


const widthdrawSchema = new mongoose.Schema({
    
    payment_method:{
        type:String,
        required: true
    },

    amount: {
        type: Number,
        required: true
    },

    status: {
        type: String,
        default: 'pending'
    },
    owner:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        // required: true
    }
}, {timestamps: true});

const Widthdraw = mongoose.model('widthdraw', widthdrawSchema);

module.exports = Widthdraw;