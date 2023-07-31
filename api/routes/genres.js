const router = require('express').Router();

module.exports = (api) => {

    /**
    * @api {get} /genres/ Get all genres
    * @apiName findAllGenres
    * @apiGroup genre
    * 
    * @apiSuccess {Genre[]} list of all the genres that exist in the database.
    */
    router.get('/',
        api.actions.genres.findAll
    );

    /**
    * @api {get} /genres/:id Get a genre by its id
    * @apiName findGenreById
    * @apiGroup genre
    *
    * @apiParam {Integer} id the genre's id.
    * 
    * @apiSuccess {Genre} genre the genre which has the given id.
    */
    router.get('/:id',
        api.actions.genres.findById);

    /**
    * @api {post} /genres/ create a new genre
    * @apiPrivate
    * @apiName connect
    * @apiGroup auth
    */
    router.post('/',
        api.middlewares.bodyParser.json(),
        api.actions.genres.create
    );

    return router;
};