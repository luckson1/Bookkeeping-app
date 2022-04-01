const expressAsyncHandler= require("express-async-handler");
const jwt= require('jsonwebtoken');
const User = require("../models/user");

const auth=expressAsyncHandler(async (req, res, next) => {
    let token;

    if (req?.headers?.authorization?.startsWith("Bearer")) {
      token = req?.headers?.authorization?.split(" ")[1];
      
      try {
        if (token) {
          const decodedUser = jwt.verify(token, process.env.JWT_KEY);
          console.log(decodedUser)
          //find the user
          const user = await User.findById(decodedUser?.id);
         
          //attach the user the req obj
          req.user = user;
          
          next();
        }
      } catch (error) {
        throw new Error("Not Authorized token expired");
      }
    } else {
      throw new Error("There is no token attached to the header");
    }
});

module.exports =auth