var Sequelize = require('sequelize');

module.exports = (api) => {

    return api.mysql.define('UserMeeting', {
    }, {
        // options
        freezeTableName: true,
        timestamps: false
    });

};