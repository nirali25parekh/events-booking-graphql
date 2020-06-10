const jwt = require('jsonwebtoken')
// this is executed before every query, it puts a field in request named 'isAuth' to true or false,
// as to whether the person accessing the endpoint is authenticated or not, 
//  so we can decide in resolvers  if we should give access or not 
// frontend should pass (headers: { "Authorization": "Bearer sdhvbs7d68s76vs7d"})

module.exports = (req, res, next) => {

    const authHeader = req.get('Authorization')
    if (!authHeader) {   // no authHeader present coming from the frontend
        req.isAuth = false
        return next()
    }

    // if authHeader present i.e something given in 'Authorization'
    token = authHeader.split(" ")[1]
    if (!token || token == "") {
        req.isAuth = false
        return next()
    }

    // if some token present, check if valid token or not and retrieve user from it 
    // (since we had stored id and email of user in token)

    let decodedToken
    try {
        decodedToken = jwt.verify(token, "thisismysecretkey")
    } catch (err) {
        // if error occurs during this
        req.isAuth = false
        return next()
    }
    // if no decoding was found i.e. invalid token
    if (!decodedToken) {
        req.isAuth = false;
        return next();
    }
    // everything is well, user has been decoded
    req.isAuth = true
    req.userId = decodedToken.userId

    next()
}