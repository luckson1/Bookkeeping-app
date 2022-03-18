const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const userSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },

}, {
    timestamp: true,
})

// verifiy password
userSchema.methods.isPasswordMatch = async (enteredPassword) => {
    return await bcrypt.compare(enteredPassword, this.password)
};


//Hash password
userSchema.pre('save', async () => {

    if (this.isModified('password')) {
        next();
    }
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt);
    next()

})

//compile schema into models
const User = mongoose.model('User', userSchema)
module.exports = User
