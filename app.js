const express = require('express')
const path = require('path')
const pug = require('pug')

//const { sequelize } = require('./Model')


//routes

const indexRoute = require('./routing/indexRoute')
const usuarioR = require('./routing/usuarioRoute')
const pacienteR = require('./routing/pacienteRoute')

const app = express()

//configuracion plantilla

app.set('views',path.join(__dirname,'views'))
app.set('view engine','pug')



//middleware



//middleware para pasar variables a las vistas



//uso de las rutas

app.use('/',indexRoute)
app.use('/usuario',usuarioR)
app.use('/paciente',pacienteR)

//errores




app.listen(3000)