const router = require('express').Router();

module.exports = (api) => {

    router.get('/',
        api.actions.meetings.findAll
    );

    /**
     * @api {get} /meetings/:meetingId get a meeting by id
     * @apiName findMeetingById
     * @apiGroup meeting
     * 
     * @apiHeader {String} x-api-key User's authentication token.
     * 
     * @apiParam {Integer} meetingId The id of the meeting.
     * 
     * @apiSuccess {Meeting} meeting the meeting with the wanted id.
     */
    router.get('/:id',
        api.middlewares.tokenValidator,
        api.actions.meetings.findById);

    /**
     * @api {post} /meetings/for/:filmId create a new meeting
    * @apiName createMeeting
    * @apiGroup meeting
    *
    * @apiHeader {String} x-api-key User's authentication token.
    * 
    * @apiParam {Integer} filmId The movie the people of the group want to see.
    * @apiParam {String} description In the body, describes where to watch the movie and other details.
    * @apiParam {String} meetingDate In the body, in the format YYYY-MM-DD HH:MM
    * 
    * @apiSuccess
    */
    router.post('/for/:filmId',
        api.middlewares.tokenValidator,
        api.middlewares.bodyParser.json(),
        api.actions.meetings.create
    );

    /**
     * @api {put} /meetings/join/:meetingId
     * @apiName joinMeeting
     * @apiGroup meeting
     * 
     * @apiHeader {String} x-api-key User's authentication token.
     * 
     * @apiParam {integer} meetingId The meeting the user wants to join.
     */
    router.put('/join/:meetingId',
        api.middlewares.tokenValidator,
        api.actions.meetings.join
    );

    /**
     * @api {get} /meetings/for/:filmId
     * @apiName meetingsForMovie
     * @apiGroup meeting
     * 
     * @apiHeader {String} x-api-key User's authentication token.
     * 
     * @apiParam {integer} filmId The movie you want to see the meetings for.
     */
    router.get('/for/:filmId',
        api.middlewares.tokenValidator,
        api.actions.meetings.forMovie
    );

    return router;
};