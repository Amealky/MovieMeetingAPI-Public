var Sequelize = require('sequelize');

module.exports = (api) => {

    api.mysql = new Sequelize(api.settings.db.database, api.settings.db.user, api.settings.db.password, {
        host: api.settings.db.host,
        port: api.settings.db.port,
        dialect: 'mysql',
        pool: {
            max: 5,
            min: 0,
            idle: 10000
        }
    });

    api.models = {
        Movie: require('./Movie')(api),
        Genre: require('./Genre')(api),
        Meeting: require('./Meeting')(api),
        User: require('./User')(api),
        UserMeeting: require('./UserMeeting')(api),
        MovieGenre: require('./MovieGenre')(api)
    };

    api.models.User.belongsToMany(api.models.Meeting, { through: api.models.UserMeeting, foreignKey: 'idUser' });
    api.models.Meeting.belongsToMany(api.models.User, { through: api.models.UserMeeting, foreignKey: 'idMeeting' });
    api.models.Movie.belongsToMany(api.models.Genre, { through: api.models.MovieGenre, foreignKey: 'idMovie' });
    api.models.Genre.belongsToMany(api.models.Movie, { through: api.models.MovieGenre, foreignKey: 'idGenre' });
    api.models.Meeting.hasOne(api.models.Movie, { foreignKey: 'idMovie' });

};