const { Model, DataTypes } = require('sequelize')
const sequelize = require('./db')
const Ala = require('./Ala')


class Habitacion extends Model { }

Habitacion.init(
    {
        numero: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        limpia: {//se refiere al estado de una habitacion si es true es que esta limpia
            type: DataTypes.BOOLEAN,
            allowNull: false
        }
    }, {
    sequelize,
    modelName: 'Habitacion',
    tableName: 'habitacion',
})

//un ala tiene muchas habitaciones y una habitacion pertenece a 1 ala
Ala.hasMany(Habitacion, { foreignKey: 'ala_id' })
Habitacion.belongsTo(Ala, { foreignKey: 'ala_id' })

module.exports = Habitacion