const Paciente = require("../Model/Paciente")
const Contacto = require("../Model/Contacto")
const Seguro = require("../Model/Seguros")
const Sintomas = require("../Model/Sintomas")
const Tipo_ingreso = require("../Model/Tipo_ingreso")

const {Op} = require('sequelize')


// *funcion para cargar un paciente
async function crear(req, res) {
    const paciente = req.body   //recibo un req y lo guardo en una variable recivo esto:paciente=[nombre='algo',DNI='algo',sexo='algo',fecha_nacimiento='algo',nombre='algo',telefono='algo',email='algo',dirreccion='algo',seguro='algo' ]
//verifica que esten todos los datos
    if (!paciente.nombre || !paciente.DNI || !paciente.sexo || !paciente.fecha_nacimiento) {        
        return res.status(400).render('pacientes/formulario',{
            error: 'todos los campos son obligatorios'
            
        })
    }

    try {//verifica si no existe un paciente con esos datos
        const pacienteExist = await Paciente.findOne({
            where: {
                [Op.or]: {
                    DNI: paciente.DNI
                }
            }
        })
        if (pacienteExist) {
            const seguros = await Seguro.findAll()
            return res.status(400).render('pacientes/formulario', {
                error: 'el paciente ya existe',
                seguros
            })
        } else{

         const contacto = await Contacto.create(paciente) //crea un contacto y lo guarda en una constante
         paciente.Contacto_id = contacto.id //agrega el id del contacto recien creado al paciente que vamos a crear
         

        await Paciente.create(paciente)     //crea el paciente con esta variable ignorando los datos que no son necesarios:paciente=[nombre='algo',DNI='algo',sexo='algo',fecha_nacimiento='algo',nombre='algo',telefono='algo',email='algo',dirreccion='algo',Seguro_id='algo',Contacto_id ]   
        
        res.redirect('/pacientes')}

    } catch (error) {
        console.error(error);
    res.status(500).render('pacientes/formulario', {
      error: 'Error al crear el paciente'
    });
    }
}// funcion para cargar un paciente*



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

async function formulario(req, res) {
    try {
        const seguros = await Seguro.findAll()
    res.render('pacientes/formulario',{ seguros })    
    } catch (error) {
        console.error(error)
        res.status(500).render('pacientes/formulario',{
            seguros : [],
            error: 'error al cargar los seguros'
        })
    }
  
}

async function inicio(req, res) {
    res.render('ingreso/inicio')    
}

async function buscarRedirect(req, res) {    
    const dni = req.body.DNI
    try{
        const paciente = await Paciente.findOne({
            where:{
                dni
            },
            include: [
                {model: Contacto},
                {model: Seguro}
            ]
        })        
        res.redirect(`/pacientes/ingreso/${dni}`);
    } catch (error) {
        console.error(error)
        res.status(500).render("ingreso/inicio",{
            error: "paciente no encontrado"
        })
    }
}

async function buscar(req, res) {    
    const dni = req.params.DNI
    
    try{
        const paciente = await Paciente.findOne({
            where:{
                dni
            },
            include: [
                {model: Contacto},
                {model: Seguro}
            ]
        })
        const sintomas = await Sintomas.findAll()
        const TI = await Tipo_ingreso.findAll()
        
        res.render('ingreso/Ingreso',{ paciente,sintomas,TI})
    } catch (error) {
        console.error(error)
        res.status(500).render("ingreso/inicio",{
            error: "paciente no encontrado"
        })
    }
}




module.exports = {
    Listar,
    crear,
    formulario,
    buscar,
    inicio,
    buscarRedirect
}