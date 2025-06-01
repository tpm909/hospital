const {Model,DataTypes} = require('sequelize');
const sequelize = require('./db');

class Departamento extends Model {}

Departamento.init(
    {
        nombre: {
            type:DataTypes.STRING,
            allowNull: false
        }
    }, {
        sequelize,
        modelName: "Departamento",
        tableName: "departameto",

    }
)

module.exports = Departamento