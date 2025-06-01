const { Sequelize } = require('sequelize');


const  Sequelize  = new sequelize(
    'Hospitalbd',
    'root',
    'admin',
    {
        host: 'localhost',
        dialect: 'mysql',
        logging: false
    }
);

module.exports = Sequelize