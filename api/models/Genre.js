var Sequelize = require('sequelize');

module.exports = (api) => {

    return api.mysql.define('Genre', {
        // fields
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            field: 'idGenre'
        },
        name: {
            type: Sequelize.DataTypes.STRING
        }
    }, {
        // options
        freezeTableName: true,
        timestamps: false
    });

};