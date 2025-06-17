const {Model,DataTypes} = require('sequelize');
const sequelize = require('./db');
const Contacto = require('./Contacto')
const Seguro = require('./Seguros')

class Paciente extends Model {}

Paciente.init(
    {
        nombre: {
            type:DataTypes.STRING
        },
        dni: {
            type:DataTypes.INTEGER
        },sexo: {
            type:DataTypes.STRING,            
            allowNull:false
        },
        fecha_nacimiento: {
            type:DataTypes.DATE
        }
    },{
        sequelize,
        modelName: 'Paciente',
        tableName: 'pacientes'
    }
)
//relacion 1 a 1 de paciente a contacto
Contacto.hasOne(Paciente,{foreignKey: 'Contacto_id'})
Paciente.belongsTo(Contacto,{foreignKey: 'Contacto_id'})
//relacion muchos a 1 de seguro con paciente
Seguro.hasMany(Paciente,{foreignKey:'Seguro_id'})
Paciente.belongsTo(Seguro,{foreignKey:'Seguro_id'})

module.exports = Paciente