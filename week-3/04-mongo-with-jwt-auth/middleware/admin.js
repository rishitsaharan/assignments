// Middleware for handling auth
const {jwtSecret} = require("../config");
const jwt = require("jsonwebtoken");

function adminMiddleware(req, res, next) {
    // Implement admin auth logic
    // You need to check the headers and validate the admin from the admin DB. Check readme for the exact headers to be expected
    const bearerToken = req.headers.authorisation;
    const token = bearerToken.split(" ")[1];
    const decodedValue = jwt.verify(token, jwtSecret);
    if(decodedValue.username){
        next();
    }
    else{
        res.status(411).json({
            message : "Error while signing in"
        })
    }

}

module.exports = adminMiddleware;