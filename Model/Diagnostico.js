const { Model, DataTypes } = require('sequelize')
const sequelize = require('./db')
const Enfermedad = require('./enfermedades')
const Tratamiento = require('./Tratamientos')
const Usuario = require('./Usuarios')
const Paciente = require('./Paciente')

class Diagnostico extends Model { }

Diagnostico.init(
    {

    }, {
    sequelize,
    modelName: 'Diagnostico',
    tableName: 'diagnosticos'
}
)

Enfermedad.hasMany(Diagnostico, { foreignKey: 'enfermedad_id' })
Diagnostico.belongsTo(Enfermedad, { foreignKey: 'enfermedad_id' })

Tratamiento.hasMany(Diagnostico, { foreignKey: 'tratamiento_id' })
Diagnostico.belongsTo(Tratamiento, { foreignKey: 'tratamiento_id' })

Usuario.hasMany(Diagnostico, { foreignKey: 'usuario_id' })
Diagnostico.belongsTo(Usuario, { foreignKey: 'usuario_id' })

Paciente.hasMany(Diagnostico, { foreignKey: 'paciente_id' })
Diagnostico.belongsTo(Paciente, { foreignKey: 'paciente_id' })


module.exports = Diagnostico