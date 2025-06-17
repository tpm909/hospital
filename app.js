const express = require('express')
const path = require('path')
const pug = require('pug')
const methodOverride = require('method-override')
const { syncDatabase } = require('./dbsinc'); 

//const { sequelize } = require('./Model')


//routes

const indexRoute = require('./routing/indexRoute')
const usuarioR = require('./routing/usuarioRoute')
const pacienteR = require('./routing/pacienteRoute')
const diagnosticoR = require('./routing/diagosticoRoute')
const ingresoR = require('./routing/ingresoRoute')

const app = express()

//configuracion plantilla

app.set('views',path.join(__dirname,'views'))
app.set('view engine','pug')



//middleware para el formulario
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public')) //es para usar archivos estaticos

// es para los patch y los put
app.use(methodOverride((req, res) => {
  const method = req.body && req.body._method;
  const allowed = ['PATCH', 'PUT'];
  if (method && allowed.includes(method.toUpperCase())) {
    return method;
  }
}));

//middleware para pasar variables a las vistas



//uso de las rutas

app.use('/',indexRoute)
app.use('/usuarios',usuarioR)
app.use('/pacientes',pacienteR)
app.use('/diagnostico',diagnosticoR)
app.use('/ingreso',ingresoR)


//si no coincide con ninguna ruta
app.use(function(req, res, next) {
res.status(404).send('la url no coincide');
});


//sincroniza la bd
syncDatabase().then(() => {
  // Inicio del servidor
  app.listen(3000, () => {
    console.log("Servidor iniciado en el puerto 3000...");
  });
});


