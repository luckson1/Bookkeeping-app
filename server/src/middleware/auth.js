const expressAsyncHandler= require("express-async-handler");
const jwt= require('jsonwebtoken');
const User = require("../models/user");

const auth=expressAsyncHandler(async (req, res) => {
    let token;
    if (req?.headers?.authorization?.startsWith('Bearer')) {
        token=req?.headers?.authorization?.split('')[1]
        try {
            if (token) {
                const decodedUser=jwt.verify(token, process.env.JWT_KEY)
                        //find the user by id
        const user = await User.findById(decoded?.id).select("-password");
        //attach the user to the request object
        req.user = user;
                next()
            }
        } catch (error) {
            throw new Error("Not Authorised, session expired")
        }
    } else {
        throw new Error("Not Authorised")
    }
});

module.exports =auth