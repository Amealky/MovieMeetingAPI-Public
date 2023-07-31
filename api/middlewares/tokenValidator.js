var jwt = require('jsonwebtoken');

module.exports = (api) => {

    function validator(req,res,next) {
   
        console.log("debug 0");
        var token = req.headers['x-api-key'];
        if (token) {
            console.log("debug 1");
            jwt.verify(token, api.settings.security.salt, function(err, user) {
                console.log("debug 2");
                if (err) {
                    return res.json({"error": true, "message": 'Failed to authenticate token.' });
                }
                req.user = user;
                next();
            });
        } else {
            return res.status(403).send("no token provided.");
        }
    }

    return validator;
}