var jwt = require('jsonwebtoken');

module.exports = (api) => {

    const User = api.models.User;

    function formatUser(user, token) {
        return {
            'id': user.idUser,
            'pseudo': user.pseudo,
            'token': token
        }
    }

    function connect(req, res, next) {
        let pseudo = req.body.pseudo;
        let pswd = req.body.password;
        if ((pseudo == null) || (pswd == null)) {
            return res.status(401).send("You have to provide pseudo and password.");
        }
        User.find({
            where: {
                pseudo: pseudo
            }
        }).then((user) => {
            if (user == null) {
                return res.status(401).send("No user known as " + pseudo);
            }
            if (user.encryptedPassword != pswd) { // TODO crypt password
                return res.status(401).send("Wrong password");
            }
            // TODO vérifier qu'il n'y a pas déjà un jwt dans le cache
            let token = jwt.sign(user.toJSON(), api.settings.security.salt, {
                expiresIn: api.settings.security.tokenExpiration
            });

            
            let answer = formatUser(user, token);
                    console.log(answer);
                    return res.status(200).send(answer);
            
        });
    }

    return {
        connect
    };
};
