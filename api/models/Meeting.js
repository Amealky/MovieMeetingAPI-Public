var Sequelize = require('sequelize');

module.exports = (api) => {

    return api.mysql.define('Meeting', {
        // fields
        idMeeting: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        description: {
            type: Sequelize.DataTypes.STRING
        },
        meetingDate: {
            type: Sequelize.DataTypes.DATE
        },
        idMovie: {
            type: Sequelize.DataTypes.INTEGER
        }
    }, {
        // options
        freezeTableName: true,
        timestamps: false
    });

};