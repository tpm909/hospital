const Usuario = require("../Model/Usuarios")

const { Op } = require('sequelize');



async function Listar(req, res) {
    try{
        const usuarios = await Usuario.findAll()
        res.render('usuarios/lista',{ usuarios })
    } catch (error) {
        console.error(error)
        res.status(500).render("usurios/lista",{
            error: "error al listar"
        })
    }
}



module.exports = {
    Listar
}