const {Model,DataTypes, Sequelize} = require('sequelize');
const sequelize = require('./db');


class Sintomas extends Model {}

Sintomas.init(
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
        modelName: 'Sintomas',
        tableName: 'Sintomas',
    }
)

module.exports = Sintomas