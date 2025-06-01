const {Model,DataTypes, Sequelize} = require('sequelize');
const sequelize = require('./db');


class Tratamientos extends Model {}

Tratamientos.init(
    {
        descripcion :{
           type: DataTypes.ARRAY,
           allowNull:false
        },
         medicamentos :{
           type: DataTypes.ARRAY,
           allowNull:false
        }
    },{
        sequelize,
        modelName: 'Tratamientos',
        tableName: 'tratamientos',
    }
)

module.exports = Tratamientos