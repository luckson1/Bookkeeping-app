const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate')

const expensesSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },

    amount: {
        type: Number,
        required: true
    },
    type: {
        type: String,
        default: "expense"
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

expensesSchema.plugin(mongoosePaginate);


//compile schema into models
const Expenses = mongoose.model('Expenses', expensesSchema)
module.exports = Expenses
