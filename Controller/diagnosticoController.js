const Paciente = require("../Model/Paciente")
const Ingreso = require("../Model/ingreso")
const Tipo_ingreso = require("../Model/Tipo_ingreso")
const Sintomas = require("../Model/Sintomas")
const Enfermedades = require("../Model/enfermedades")
const Tratamientos = require("../Model/Tratamientos")
const Diagnostico = require("../Model/Diagnostico")

const {Op} = require('sequelize')

async function crear(req,res) { 
    const info = req.body
console.log(info.paciente);

 try{

const diagnostico = await Diagnostico.create({//crea el diagnostico
    enfermedad_id: info.Enfermedad_id,
    tratamiento_id: info.Tratamiento_id,
    detalles: info.detalles,
    paciente_id: info.paciente
    
})

if(info.internacion){
res.redirect('/pacientes') 
}else{
  res.redirect('/pacientes')  
}



 }catch(error){
    console.error(error)
    res.status(500).render('ingreso/inicio',{
        error: 'Error al crear el ingreso'
    })
 }

    
}

async function diagnosticoForm(req,res) {
    const id = req.query.id
    
    
    try {
          const paciente = await Paciente.findOne(
        {
            where:{id} 
       }
    )
    
    const tratamientos = await Tratamientos.findAll({})
    const enfermedades = await Enfermedades.findAll({})

    res.render("diagnostico/form",{paciente,tratamientos,enfermedades})
    } catch (error) {
         console.error(error)
        res.status(500).render("/",{
            error: "paciente no encontrado"
        })
    }

    
}

module.exports = {
    crear,
    diagnosticoForm
}