const Paciente = require("../Model/Paciente")
const Contacto = require("../Model/Contacto")
const Seguro = require("../Model/Seguros")
const Sintomas = require("../Model/Sintomas")
const Tipo_ingreso = require("../Model/Tipo_ingreso")
const Internacion = require("../Model/internacion")
const Ingreso = require("../Model/ingreso")
const Tratamientos = require("../Model/Tratamientos")
const Enfermedades = require("../Model/enfermedades")
const Diagnosticos = require("../Model/Diagnostico")
const Usuario = require("../Model/Usuarios")
const Camas = require("../Model/Camas")
const Habitacion = require("../Model/Habitacion")

const { Op } = require('sequelize')



// *funcion para cargar un paciente
async function crear(req, res) {
    const paciente = req.body   //recibo un req y lo guardo en una variable recivo esto:paciente=[nombre='algo',DNI='algo',sexo='algo',fecha_nacimiento='algo',nombre='algo',telefono='algo',email='algo',dirreccion='algo',seguro='algo' ]


    //verifica que esten todos los datos
    if (!paciente.nombre || !paciente.dni || !paciente.sexo || !paciente.fecha_nacimiento) {
        return res.status(400).render('pacientes/formulario', {
            error: 'todos los campos son obligatorios'

        })
    }

    try {//verifica si no existe un paciente con esos datos
        const pacienteExist = await Paciente.findOne({
            where: {
                [Op.or]: {
                    dni: paciente.dni
                }
            }
        })
        if (pacienteExist) {
            const seguros = await Seguro.findAll()
            return res.status(400).render('pacientes/formulario', {
                error: 'el paciente ya existe',
                seguros
            })
        } else {

            const contacto = await Contacto.create(paciente) //crea un contacto y lo guarda en una constante
            paciente.Contacto_id = contacto.id //agrega el id del contacto recien creado al paciente que vamos a crear


            const Cpaciente = await Paciente.create(paciente)     //crea el paciente con esta variable ignorando los datos que no son necesarios:paciente=[nombre='algo',DNI='algo',sexo='algo',fecha_nacimiento='algo',nombre='algo',telefono='algo',email='algo',dirreccion='algo',Seguro_id='algo',Contacto_id ]   

            if (paciente.ingreso) {//si viene desde el ingreso entoces lo lleva directamente al ingreso con los datos del paciente para ingresarlo y si no lo lleva a la lista de pacientes
                const data = await busqueda(Cpaciente.dni)
                const paciente = data.paciente
                const sintomas = data.sintomas
                const TI = data.TI
                res.render('ingreso/Ingreso', { paciente, sintomas, TI })
            } else {
                res.redirect('/pacientes')
            }

        }

    } catch (error) {
        console.error(error);
        res.status(500).render('pacientes/formulario', {
            error: 'Error al crear el paciente'
        });
    }
}// funcion para cargar un paciente*



async function Listar(req, res) {
    try {
        const pacientes = await Paciente.findAll({
            include: [
                { model: Contacto },
                { model: Seguro }
            ]
        })
        res.render('pacientes/lista', { pacientes })
    } catch (error) {
        console.error(error)
        res.status(500).render("pacientes/lista", {
            error: "error al listar"
        })
    }
}

async function formulario(req, res) {
    const ingreso = req.query.ingreso
    try {
        const seguros = await Seguro.findAll()
        console.log(seguros);
        
        res.render('pacientes/formulario', { seguros, ingreso })
    } catch (error) {
        console.error(error)
        res.status(500).render('pacientes/formulario', {
            seguros: [],
            error: 'error al cargar los seguros'
        })
    }

}


async function busqueda(dni) {
    try {
        const paciente = await Paciente.findOne({
        where: {
            dni
        },
        include: [
            { model: Contacto },
            { model: Seguro }
        ]
    })

    if (!paciente) {return res.status(404).render("ingreso/inicio", {error: "Paciente no encontrado" }); }
        
    const sintomas = await Sintomas.findAll()
    const TI = await Tipo_ingreso.findAll()

    return { paciente, sintomas, TI }
    } catch (error) {
        throw error;
        
    }
    
}


async function historial(id) {


    try {
        const paciente = await Paciente.findOne(
            {
                where: {
                    id: id
                }
            }
        )

        if (!paciente) { throw { code: 'NO_PACIENTE_NO_ENCONTRADO', message: "no se encontro al paciente" }; }

        const ingresos = await Ingreso.findAll(
            {
                where: { id_paciente: id },
                include: [
                    { model: Tipo_ingreso }
                ]
            }
        )


        const diagnosticos = await Diagnosticos.findAll(
            {
                where: { paciente_id: id },
                include: [
                    { model: Enfermedades },
                    { model: Tratamientos },
                    { model: Usuario }
                ]
            }
        )

        const id_diagnosticos = [...new Set(diagnosticos.map(c => c.id))]

        const internaciones = await Internacion.findAll(
            {
                where: { diagnostico_id: id_diagnosticos },
                include: [
                    { model: Camas },
                    { model: Diagnosticos }
                ]
            }
        )

        return { ingresos, paciente, diagnosticos, internaciones }

    } catch (error) {
        console.error(error)

        return error
    }



}

async function editar(req, res) {
    const paciente = req.body

    try {
        Contacto.update(
            {
                telefono: paciente.contacto.telefono,
                email: paciente.contacto.email,
                direccion: paciente.contacto.direccion
            }, {
            where: paciente.contacto.id
        }
        )

        Paciente.update(
            {
                nombre: paciente.nombre
            },
            {
                where: paciente.id
            }
        )
        res.redirect('/pacientes')

    } catch (error) {
        console.error(error);
        res.status(500).render('pacientes', {
            error: 'Error al crear el paciente'
        });
    }

}

async function ver(req, res) {
    const id = req.query.id


    try {
        const paciente = await Paciente.findOne({
            where: { id }
        })

        const data = await historial(id);
        const ingresos = data.ingresos
        const internaciones = data.internaciones
        const diagnosticos = data.diagnosticos


        res.render('pacientes/paciente', { paciente, ingresos, internaciones, diagnosticos })
    } catch (error) {
        console.error(error);
        res.status(500).render('pacientes', {
            error: 'Error al encontrar el paciente'
        });
    }




}



module.exports = {
    Listar,
    crear,
    formulario,
    historial,
    busqueda,
    ver

}