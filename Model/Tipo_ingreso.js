const {Model,DataTypes, Sequelize} = require('sequelize');
const sequelize = require('./db');


class Tipo_ingreso extends Model {}

Tipo_ingreso.init(
    {
        nombre :{
           type: DataTypes.ARRAY,
           allowNull:false
        },
         descripcion :{
           type: DataTypes.ARRAY,
           allowNull:false
        }
    },{
        sequelize,
        modelName: 'Tipos_ingreso',
        tableName: 'tipos_de_ingreso',
    }
)

module.exports = Tipo_ingreso