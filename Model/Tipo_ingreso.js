const {Model,DataTypes, Sequelize} = require('sequelize');
const sequelize = require('./db');


class Tipo_ingreso extends Model {}

Tipo_ingreso.init(
    {
        nombre :{
           type: DataTypes.STRING,
           allowNull:false
        },
         descripcion :{
           type: DataTypes.STRING,
           allowNull:false
        }
    },{
        sequelize,
        modelName: 'Tipos_ingreso',
        tableName: 'tipos_de_ingreso',
    }
)

module.exports = Tipo_ingreso