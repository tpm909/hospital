const {Model,DataTypes, Sequelize} = require('sequelize');
const sequelize = require('./db');


class Seguros extends Model {}

Seguros.init(
    {
        nombre :{
           type: DataTypes.STRING,
           allowNull:false
        }
    },{
        sequelize,
        modelName: 'Seguros',
        tableName: 'Seguros',
    }
)

module.exports = Seguros