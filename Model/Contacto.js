const {Model,DataTypes} = require('sequelize')
const sequelize = require('./db')

class Contacto extends Model {}

Contacto.init(
    {
        telefono:{
            type:DataTypes.INTEGER
        },
        numero_emergencia: {
            type:DataTypes.INTEGER
        },
        email:{
            type: DataTypes.STRING
        },
        direccion: {
            type:DataTypes.STRING
        }
    },{
        sequelize,
        modelName: "Contactos",
        tableName: "contactos"
    }
)


module.exports = Contacto