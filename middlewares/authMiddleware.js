const JWT = require('jsonwebtoken');

//creating the function directly with module.exports i.e. exporting it directly
module.exports = async (req, res, next)  => {
    try {
        const token = req.headers['authorization'].split(" ")[1];
        //.split(' '): The split() method is used to split a string into an array of substrings based on a specified delimiter. In this case, the string is the value of the 'authorization' header, and the delimiter is a space character (' ').
        JWT.verify(token, process.env.JWT_SECRET, (err, decode) => {
            if (err) {
                return res.status(401).send({
                    success:false,
                    message:'Auth Failed',
                });
            }
            else{
                req.body.userId = decode.userId;
                // Calling the 'next()' function to pass control to the next middleware or route handler.
                next();
            }
        });
    } catch (error) {
        console.log(error);
        return res.status(401).send({ //401: unauthorised access
            success:false,
            error,
            message: 'Auth failed'
        })
    }
}