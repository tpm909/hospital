const {Model,DataTypes} = require('sequelize')
const sequelize = require('./db')
const Usuario =  require('./Usuarios')
const Paciente = require('./Paciente')
const Tipo_ingreso = require('./Tipo_ingreso')
const Sintomas = require('./Sintomas')

class Ingreso extends Model {}

Ingreso.init(
    {
        
    },{
        sequelize,
        modelName: 'ingreso',
        tableName: 'ingreso'
    }
)

Usuario.hasMany(Ingreso,{foreignKey:'id_usuario'})
Ingreso.belongsTo(Usuario,{foreignKey:'id_usuario'})

Paciente.hasMany(Ingreso,{foreignKey:'id_paciente'})
Ingreso.belongsTo(Paciente,{foreignKey:'id_paciente'})

Tipo_ingreso.hasMany(Ingreso,{foreignKey: 'id_TI'})
Ingreso.belongsTo(Tipo_ingreso,{foreignKey: 'id_TI'})

Sintomas.belongsToMany(Ingreso,{foreignKey: 'id_Sintomas'})
Ingreso.belongsToMany(Sintomas,{foreignKey:'id_sintomas'})


module.exports = Ingreso