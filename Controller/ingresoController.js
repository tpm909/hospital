const Paciente = require("../Model/Paciente")
const Ingreso = require("../Model/ingreso")
const Tipo_ingreso = require("../Model/Tipo_ingreso")
const Sintomas = require("../Model/Sintomas")
const pacienteC = require("../Controller/pacienteController")

const {Op} = require('sequelize')

async function crear(req,res) {
    
    const info = req.body

 try{

const ingreso = await Ingreso.create({//crea el ingreso
    id_TI: info.Tipo_de_ingreso,//agrega el tipo de ingreso
    id_paciente: info.idp //agrega el id del paciente
})


if ( Array.isArray(info.sintomas) && info.sintomas && info.sintomas.length > 0) {//verifica si hay datos en el arreglo
      const sintomasId = info.sintomas.map(s => JSON.parse(s).id)     
      await ingreso.addSintomas(sintomasId)
    }

res.render('ingreso/inicio')
 }catch(error){
    console.error(error)
    res.status(500).render('ingreso/inicio',{
        error: 'Error al crear el ingreso'
    })
 }

    
}

async function buscar(req, res) {
    const dni = req.body.dni
    
    try {
        const data = await pacienteC.busqueda(dni)
        const paciente = data.paciente
        const sintomas = data.sintomas
        const TI = data.TI

        res.render('ingreso/Ingreso', { paciente, sintomas, TI })
    } catch (error) {
        console.error(error)
        res.status(500).render("ingreso/inicio", {
            error: "paciente no encontrado"
        })
    }
}

async function ingreso(req, res) {
    res.render('ingreso/inicio')
}

module.exports = {
    crear,
    ingreso,
    buscar
}