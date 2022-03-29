const expressAsyncHandler=require('express-async-handler')
const generateToken= require('../../middleware/generteTokens')
const User = require("../../models/user")
//register
const registerUser = expressAsyncHandler(async (req, res) => {
  const { email, firstname, lastname, password } = req?.body;

  //check if user exists
  const userExists = await User.findOne({ email });
  if (userExists) throw new Error("User already exists");
  try {
    const user = await User.create({ email, firstname, lastname, password });
    res.json({user});
  } catch (error) {
    res.json(error);
  }
});

// login

const loginUserCtrl = expressAsyncHandler(async (req, res) => {
    const { email, password } = req.body;
    //check if user exists
    const userFound = await User.findOne({ email });
    //Check if password is match
    if (userFound && (await userFound?.isPasswordMatch(password))) {
      res.json({
        _id: userFound?._id,
        firstName: userFound?.firstName,
        lastName: userFound?.lastName,
        email: userFound?.email,
        isAdmin: userFound?.isAdmin,
        token: generateToken(userFound?._id),
      });
    } else {
      res.status(401);
      throw new Error("Invalid Login Credentials");
    }
  });

//fetch all users

const fetchAllCtrl= expressAsyncHandler( async (req, res)=> {
    try { const users= await User.find({});
        res.json({users})
        
    } catch (error) {
        res.json({error})
    }
});




module.exports={registerUser, fetchAllCtrl, loginUserCtrl}