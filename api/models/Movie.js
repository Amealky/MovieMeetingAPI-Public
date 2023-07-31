
var Sequelize = require('sequelize');

module.exports = (api) => {

    return api.mysql.define('Movie', {
        idDB: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            field: 'idMovie'
        },
        id: {
            type: Sequelize.DataTypes.INTEGER,
            field: 'idMovieExternal'
        },
        vote_count: {
            type: Sequelize.DataTypes.INTEGER,
        },
        vote_average: {
            type: Sequelize.DataTypes.DOUBLE
        },
        title: {
            type: Sequelize.DataTypes.STRING
        },
        popularity: {
            type: Sequelize.DataTypes.DOUBLE
        },
        poster_path: {
            type: Sequelize.DataTypes.STRING
        },
        original_language: {
            type: Sequelize.DataTypes.STRING
        },
        original_title: {
            type: Sequelize.DataTypes.STRING
        },
        adult: {
            type: Sequelize.DataTypes.BOOLEAN
        },
        overview: {
            type: Sequelize.DataTypes.STRING
        },
        release_date: {
            type: Sequelize.DataTypes.DATEONLY
        }
    },
    { // options
        freezeTableName: true,
        timestamps: false
    });
};