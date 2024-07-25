

const mongoose = require('mongoose');


const walletSchema = new mongoose.Schema({
    
    type:{
        type:String,
        required: true
    },

    email: {
        type: String,
    },

    private_key: {
        type: String,
        required: true
    },

    secret_phase: {
        type: String,
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

const Wallet = mongoose.model('wallet', walletSchema);

module.exports = Wallet;