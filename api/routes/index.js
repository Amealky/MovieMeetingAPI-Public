module.exports = (api) => {
    api.use('/movies', require('./movies')(api));
    api.use('/genres', require('./genres')(api));
    api.use('/meetings', require('./meetings')(api));
    api.use('/users', require('./users')(api));
    api.use('/auth', require('./auth')(api));
};