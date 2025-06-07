const express = require('express')
const path = require('path')
const pug = require('pug')

//const { sequelize } = require('./Model')


//routes

const indexRoute = require('./routing/indexRoute')
const usuarioR = require('./routing/usuarioRoute')
const pacienteR = require('./routing/pacienteRoute')
const diagnosticoR = require('./routing/diagosticoRoute')

const app = express()

//configuracion plantilla

app.set('views',path.join(__dirname,'views'))
app.set('view engine','pug')



//middleware para el formulario
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public')) //es para que express sirva a los archivos estaticos


//middleware para pasar variables a las vistas



//uso de las rutas

app.use('/',indexRoute)
app.use('/usuarios',usuarioR)
app.use('/pacientes',pacienteR)
app.use('/diagnostico',diagnosticoR)


//errores




app.listen(3000)