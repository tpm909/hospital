const {Model,DataTypes} = require('sequelize');
const sequelize = new Sequelize('./db');
const Departamento = require('./Departamento')


class Usuario extends Model {}

Usuario.init(
    {
     nombre: {
        type:DataTypes.ARRAY,
        allowNull:false
     },
     contraseña: {

     }    
    },{
        sequelize,
        modelName: 'Usuario',
        tableName: 'usuario',
    }
)
//relacion 1..n
Departamento.hasMany(Usuario,{ foreignKey: 'dep_id'});
Usuario.belongsTo(Departamento,{foreignKey: 'dep_id'})



module.exports = Usuario