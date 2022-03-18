const jwt=require('jsonwebtoken');

const generateToken= id => {
    return jwt.sign({id}, pricess.env.JWT_KEY, { expiresIn: '1d'});
};

module.exports =generateToken