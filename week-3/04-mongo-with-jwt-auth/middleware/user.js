const {jwtSecret} = require("../config");
const jwt = require("jsonwebtoken");

function userMiddleware(req, res, next) {
    // Implement user auth logic
    // You need to check the headers and validate the user from the user DB. Check readme for the exact headers to be expected
    const bearerToken = req.headers.authorisation;
    const token = bearerToken.split(" ")[1];
    const decodedValue = jwt.verify(token, jwtSecret);
    if(decodedValue.username){
        req.username = decodedValue.username;
        next();
    }
    else{
        res.status(411).json({
            message : "Error while signing in"
        })
    }
}

module.exports = userMiddleware;