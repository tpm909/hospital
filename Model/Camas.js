const {Model,DataTypes} = require('sequelize')
const sequelize = require('./db')
const Habitacion = require('./Habitacion')


class Camas extends Model {}

Camas.init(
    {
        ocupada: {
            type:DataTypes.BOOLEAN,
            allowNull:false            
        }

},{
    sequelize,
        modelName: 'Camas',
        tableName: 'camas',
}
)
//una habitacion tiene muchas camas y una cama tiene solo 1 habitacion
Habitacion.hasMany(Camas,{foreignKey: 'room_id'})
Camas.belongsTo(Habitacion,{foreignKey: 'room_id'})

module.exports = Camas