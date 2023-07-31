const router = require('express').Router();

module.exports = (api) => {

    /**
    * @api {post} /auth/ Connection
    * @apiName connect
    * @apiGroup auth
    *
    * @apiParam {String} pseudo  user's pseudonym.
    * @apiParam {String} password  user's password.
    * 
    * @apiSuccess {String} token Token for user authentification, to put in header for every secure endpoint.
    */
    router.post('/',
        api.middlewares.bodyParser.json(),
        api.actions.auth.connect
    );

    return router;
};