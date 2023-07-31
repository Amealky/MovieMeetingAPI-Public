module.exports = (api) => {
    api.actions = {
        movies:  require('./movies/crud')(api),
        genres:  require('./genres/crud')(api),
        meetings: require('./meetings/crud')(api),
        users: require('./users/crud')(api),
        auth: require('./auth/crud')(api)
    };
};