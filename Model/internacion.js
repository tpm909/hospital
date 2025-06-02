const {Model,DataTypes} = require('sequelize')
const sequelize = require('./db')
const Diagnostico = require('./Diagnostico')
const Cama = require('./Camas')
const Ingreso = require('./ingreso')


class Internacion extends Model {}

Internacion.init(
    {
        estado:{
            type:DataTypes.BOOLEAN
        }
    },{
        sequelize,
        modelName: 'Internacion',
        tableName: 'Internacion'
    }
)

Diagnostico.hasOne(Internacion,{foreignKey: 'diagnostico_id'})
Internacion.belongsTo(Diagnostico,{foreignKey: 'diagnostico_id'})

Cama.hasOne(Internacion,{foreignKey: 'cama_id'})
Internacion.belongsTo(Cama,{foreignKey: 'cama_id'})

Ingreso.hasOne(Internacion,{foreignKey: 'Ingreso_id'})
Internacion.belongsTo(Ingreso,{foreignKey: 'Ingreso_id'})


module.exports = Internacion

