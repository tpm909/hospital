const {Model,DataTypes} = require('sequelize');
const sequelize = require('./db');
const Departamento = require('./Departamento')


class Usuario extends Model {}

Usuario.init(
    {
     nombre: {
        type:DataTypes.ARRAY,
        allowNull:false
     },
     contraseña: {
        type:DataTypes.INTEGER,
        allowNull:false
     }    
    },{
        sequelize,
        modelName: 'Usuario',
        tableName: 'usuario',
    }
)
//relacion 1..n un usuario puede pertenecer solo a 1 departamento y un departamento puede tener muchos usuarios
Departamento.hasMany(Usuario,{ foreignKey: 'dep_id'});
Usuario.belongsTo(Departamento,{foreignKey: 'dep_id'})



module.exports = Usuario