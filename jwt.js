const jwt = require('jsonwebtoken');

const jwtAuthMiddleware = (req,res,next) => {
    //
    const authorization = req.headers.authorization;
    if(!authorization) return res.status(401).json({error:'Token not found'})
    // Extracting token from Header
    const token = req.headers.authorization.split(' ')[1];
    if(!token) return res.status(401).json({error:'Unauthorised'});

    try {
        // If user given an acceptable token then now for verifying the token
        const decoded = jwt.verify(token,process.env.JWT_SECRET); // it return the payload

        //Attaching user information to the request object
        req.user = decoded; // Format: req.key_name = values; => key_name can be anything you decide
        next();
    } 
    catch (error) {
        console.error(error);
        res.status(401).json({error:'Invalid Token'});
    }
}

const generateToken = (userData) => {
    return jwt.sign(userData,process.env.JWT_SECRET);
}

module.exports = {jwtAuthMiddleware, generateToken};