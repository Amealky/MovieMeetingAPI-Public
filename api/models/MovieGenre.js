var Sequelize = require('sequelize');

module.exports = (api) => {

    return api.mysql.define('MovieGenre', {
    }, { // options
        freezeTableName: true,
        timestamps: false
    });
};