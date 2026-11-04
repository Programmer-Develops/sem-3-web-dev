const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
    try{
        const token = req.headers.authorization;
        const decode = jwt.verify(token, "coding");
        if(decode) {
            next()
        } else {
            res.send({msg: "Login First and Invalid Token"})
        }
    }
    catch (error) {
        res.send({msg: "error"})
    }
};

module.exports = { auth };