const {Model,DataTypes, Sequelize} = require('sequelize');
const sequelize = require('./db');


class Enfermedades extends Model {}

Enfermedades.init(
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
        modelName: 'Enfermedades',
        tableName: 'Enfermedades',
    }
)

module.exports = Enfermedades