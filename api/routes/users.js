const router = require('express').Router();

module.exports = (api) => {

    /**
    * @api {get} /users/ get all users
    * @apiPrivate
    * @apiName findAllUsers
    * @apiGroup user
    * 
    * @apiSuccess {User[]} users All the users.
    */
    router.get('/',
        api.actions.users.findAll
    );

    /**
    * @api {get} /users/:id get user by id
    * @apiName findUserById
    * @apiGroup user
    * 
    * @apiParam {Integer} id  the user's id.
    * 
    * @apiSuccess {User} user The user with the given id.
    */
    router.get('/get/:id',
        api.actions.users.findById);

    /**
    * @api {get} /users/buddys get user you already seen
    * @apiName findBuddys
    * @apiGroup user
    * 
    * @apiSuccess {User} users you already seen
    */
   router.get('/buddys',
       api.middlewares.tokenValidator,
        api.actions.users.findBuddys);

    /**
    * @api {post} /users/ create a new user
    * @apiName createUser
    * @apiGroup user
    * 
    * @apiParam {String} pseudo
    * @apiParam {String} password
    * @apiParam {String} [description=""]
    * 
    * @apiSuccess {User} user The created user.
    */
    router.post('/',
        //NEED TO ENCRYPT PASSWORD HERE OR BEFORE IN THE APP
        api.middlewares.bodyParser.json(),
        api.actions.users.create
    );

    return router;
};