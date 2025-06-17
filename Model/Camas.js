const {Model,DataTypes} = require('sequelize')
const sequelize = require('./db')
const Habitacion = require('./Habitacion')


class Camas extends Model {}

Camas.init(
    {
        ocupada: {
            type:DataTypes.BOOLEAN,
            allowNull:false            
        },
        limpia: {//se refiere al estado de una habitacion si es true es que esta limpia
            type: DataTypes.BOOLEAN,
            allowNull: false
        }

},{
    sequelize,
        modelName: 'Camas',
        tableName: 'camas',
}
)
//una habitacion tiene muchas camas y una cama tiene solo 1 habitacion
Habitacion.hasMany(Camas,{foreignKey: 'habitacion_id'})
Camas.belongsTo(Habitacion,{foreignKey: 'habitacion_id'})

module.exports = Camas