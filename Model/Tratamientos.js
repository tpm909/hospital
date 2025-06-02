const {Model,DataTypes, Sequelize} = require('sequelize');
const sequelize = require('./db');


class Tratamientos extends Model {}

Tratamientos.init(
    {
        descripcion :{
           type: DataTypes.STRING,
           allowNull:false
        },
         medicamentos :{
           type: DataTypes.STRING,
           allowNull:false
        }
    },{
        sequelize,
        modelName: 'Tratamientos',
        tableName: 'tratamientos',
    }
)

module.exports = Tratamientos