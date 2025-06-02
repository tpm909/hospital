const { Sequelize } = require('sequelize');


const  sequelize  = new Sequelize(
    'hospitalbd',
    'root',
    '',
    {
        host: 'localhost',
        dialect: 'mysql',
        logging: false
    }
);

module.exports = sequelize