const router = require('express').Router();

module.exports = (api) => {

    /**
    * @api {get} /movies/?page=:page_num&nb=:nb_per_page get all movies
    * @apiName findAllMovies
    * @apiGroup movie
    *
    * @apiHeader {String} x-api-key User's connection token.
    * 
    * @apiParam {Integer} [page_num=1] the number of the chosen page
    * @apiParam {Integer} [nb_per_page=10] number of movies per page
    * 
    * @apiSuccess {Movie[]} movies Movies from the database.
    */
    router.get('/',
        api.middlewares.tokenValidator,
        api.actions.movies.findAll
    );

    /**
    *  @api {get} /movies/playing?page=:page_num&nb=:nb_per_page get currently playing movies
    * @apiName findPlayingMovies
    * @apiGroup movie
    *
    * @apiHeader {String} x-api-key User's connection token.
    * 
    * @apiParam {Integer} [page_num=1] the number of the chosen page
    * @apiParam {Integer} [nb_per_page=10] number of movies per page
    * 
    * @apiSuccess {Movie[]} movies Movies from the database.
    */
    router.get('/playing',
        api.middlewares.tokenValidator,
        api.actions.movies.findPlaying
    );

    /**
    *  @api {get} /movies/with-latest-meetings?page=:page_num&nb=:nb_per_page get currently playing movies
    * @apiName findMoviesWithRecentMeetings
    * @apiGroup movie
    *
    * @apiHeader {String} x-api-key User's connection token.
    * 
    * @apiParam {Integer} [page_num=1] the number of the chosen page
    * @apiParam {Integer} [nb_per_page=10] number of movies per page
    * 
    * @apiSuccess {Movie[]} movies Movies from the database.
    */
    router.get('/with-latest-meetings',
        api.middlewares.tokenValidator,
        api.actions.movies.findMoviesWithRecentMeetings
    );

    /**
    *  @api {get} /movies/upcoming?page=:page_num&nb=:nb_per_page get currently playing movies
    * @apiName findFutureMovies
    * @apiGroup movie
    *
    * @apiHeader {String} x-api-key User's connection token.
    * 
    * @apiParam {Integer} [page_num=1] the number of the chosen page
    * @apiParam {Integer} [nb_per_page=10] number of movies per page
    * 
    * @apiSuccess {Movie[]} movies Movies from the database.
    */
    router.get('/upcoming',
        api.middlewares.tokenValidator,
        api.actions.movies.findFuture
    );

    /**
    * @api {get} /movies/:id get movie by id
    * @apiName findMovieById
    * @apiGroup movie
    *
    * @apiHeader {String} x-api-key User's connection token.
    * 
    * @apiParam {Integer} id  the movie's id.
    * 
    * @apiSuccess {Movie} movie The movie with the given id.
    */
    router.get('/:id',
        api.middlewares.tokenValidator,
        api.actions.movies.findById);

    /**
    * @api {get} /movies/:name get movie by name
    * @apiName findMovieByName
    * @apiGroup movie
    *
    * @apiHeader {String} x-api-key User's connection token.
    * 
    * @apiParam {String} name  the movie's name.
    * 
    * @apiSuccess {Movie} movie The movie with the given name.
    */
    router.get('/forName/:name',
        api.middlewares.tokenValidator,
        api.actions.movies.findByName);

    /**
    * @api {post} /movies/ create a new movie
    * @apiPrivate
    * @apiName createMovie
    * @apiGroup movie
    *
    * @apiHeader {String} x-api-key User's connection token.
    */
    router.post('/',
        api.middlewares.tokenValidator,
        api.middlewares.bodyParser.json(),
        api.actions.movies.create
    );

    return router;
};