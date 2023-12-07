const jwt = require('jsonwebtoken')

function verifyAccessToken(token){
    return jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
}

function verifyRefreshToken(token){
    return jwt.verify(token, process.env.REFRESH_TOKEN_SECRET)
}

// function verifyRefreshToken(token){
//     try {
//         return jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
//     } catch (error) {
//         console.error("Error verifying refresh token:", error.message);
//         return null;
//     }
// }


module.exports = {
    verifyAccessToken,
    verifyRefreshToken
}