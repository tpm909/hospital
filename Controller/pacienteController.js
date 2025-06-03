const Paciente = require("../Model/Paciente")
const Contacto = require("../Model/Contacto")
const Seguro = require("../Model/Seguros")

const {Op} = require('sequelize')


async function crear(req, res) {
    const paciente = req.body
//verifica que esten todos los datos
    if (!paciente.nombre || !paciente.DNI || !paciente.sexo || !paciente.fecha_nacimiento) {
        return res.status(400).render('pacientes/formulario',{
            error: 'todos los campos son obligatorios'
            
        })
    }
//verifica si no existe un paciente con esos datos
    try {
        const pacienteExist = await Paciente.findOne({
            where: {
                [Op.or]: {
                    dni: paciente.DNI
                }
            }
        })
        if (pacienteExist) {
            return res.status(400).render('pacientes/formulario', {
                error: 'el paciente ya existe'
            })
        }

        await Paciente.create(paciente)
        res.redirect('/pacientes')

    } catch (error) {
        console.error(error);
    res.status(500).render('pacientes/formulario', {
      error: 'Error al crear el usuario'
    });
    }
}


async function Listar(req, res) {
    try{
        const pacientes = await Paciente.findAll({
            include: [
                {model: Contacto},
                {model: Seguro}
            ]
        })
        res.render('pacientes/lista',{ pacientes })
    } catch (error) {
        console.error(error)
        res.status(500).render("pacientes/lista",{
            error: "error al listar"
        })
    }
}



module.exports = {
    Listar
}