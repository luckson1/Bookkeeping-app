const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate')

const salesSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    type: {
        type: String,
        default: "sales"
    },
    amount: {
        type: Number,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

}, {
    timestamp: true,
    toJSON: {
        virtual: true
    },
    toObject: true,
});


// pagination

salesSchema.plugin(mongoosePaginate);
//compile schema into models
const Sales = mongoose.model('Sales', salesSchema)
module.exports = Sales
