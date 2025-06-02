const {Model,DataTypes, Sequelize} = require('sequelize');
const sequelize = require('./db');


class Sintomas extends Model {}

Sintomas.init(
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
        modelName: 'Sintomas',
        tableName: 'Sintomas',
    }
)



module.exports = Sintomas