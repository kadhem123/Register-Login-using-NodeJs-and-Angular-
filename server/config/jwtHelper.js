const jwt = require('jsonwebtoken');

module.exports.verifyJwtToken = (req, res, next) => {
    var token;
    if ('authorization' in req.headers)
        token =req.headers.authorization.split(' ')[1];

    if (!token)
        return res.status(403).send({auth: false, message: 'No token provided.',token:req.headers.authorization });
    else {
        var a=new Buffer( process.env.JWT_SECRET, 'base64' )
        jwt.verify(token,process.env.JWT_SECRET ,
            (err, decoded) => {
                if (err)
                    return res.status(500).send({ secret:process.env.JWT_SECRET,auth: false,error:err, message: 'Token authentication failed.',token:req.headers.authorization.split(' ')[1]});
                else {
                    req._id = decoded._id;
                    next();
                }
            }
        )
    }
}