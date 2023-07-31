
var Sequelize = require('sequelize');

module.exports = (api) => {

    return api.mysql.define('User', {
        idUser: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        pseudo: {
            type: Sequelize.DataTypes.STRING,
            unique: true
        },
        encryptedPassword: {
            type: Sequelize.DataTypes.STRING
        },
        joinedOn: {
            type: Sequelize.DataTypes.DATEONLY,
            defaultValue: Sequelize.NOW
        },
        description: {
            type: Sequelize.DataTypes.STRING
        }
    },
    { // options
        freezeTableName: true,
        timestamps: false
    });
};