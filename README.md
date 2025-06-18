# Projecto transversal web2: HIS 

HIS(Hospital Information System) como indica su nombre es un sistema para gestionar los datos un hospital
este projecto tiene como objetivo gestionar: la entrada, la internacion, el diagnostico y el cuidado de los pacientes

en esta primer entrega solo estan disponibles la entrada y la internacion. todavia no se puede cargar pacientes nulos
no hay distincion de los tipos de ingreso, tampoco hay una plantilla css y no hay distincion entre doctores y enfermeras.

//FUNCIONES IMPLEMENTADAS

- creacion de pacientes
- creacion de ingresos
- creacion de diagnosticos
- creacion de internaciones
- listado de los pacientes
- historial de los pacientes
- habitaciones limitadas por sexo,limpieza y ocupada

//ENDPOINT//

- PACIENTE

get /paciente
muestra una lista de todos los pacientes
renderiza:pacientes/lista.pug

get /paciente/nuevo
muestra un formulario para agregar un paciente
renderiza:pacientes/formulario.pug

post /paciente/nuevo
crea un paciente y te redirije a /paciente

get /paciente/ver
muestra informacion del paciente incluido el historial
renderiza:pacientes/paciente.pug

- INGRESO

get /ingreso
muestra cuadro de texto con un boton para buscar a los pacientes
renderiza:ingreso/inicio.pug

post /ingreso
busca un paciente por el dni
renderiza:ingreso/ingreso

post /ingreso/crear
esto crea un ingreso
redirecciona:/paciente

- DIAGNOSTICO

get /diagnostico/crear
muestra un formulario para hacer un diagnostico y si que quiere una internacion
renderiza:diagnostico/form.pug

post /diagnostico/crear
crea un diagnostico y una internacion(en caso de ser necesaria)

//TECNOLOGIAS USADAS//

- dotenv:Permite cargar variables de entorno desde un archivo .env al entorno de ejecución (process.env)
- express: Maneja rutas, middleware, peticiones/respuestas HTTP, etc
- method-override(todavia no se utiliza):Permite usar métodos HTTP como PUT o DELETE desde formularios HTML (que solo soportan GET y POST)
- mysql12:cliente para conectarse a bases de datos MySQL desde Node.js
- nodemon:Herramienta para desarrollo que reinicia automáticamente la app cada vez que detecta cambios en el código
- pug:es el motor de plantilla utilizado para renderizar las vistas
- sequelize:es una ORM (Object-Relational Mapping) que permite interactuar con bases de datos SQL usando JavaScript


//INSTALACION//

- paso 1 
clonar el repositorio git:``` https://github.com/tpm909/hospital```

- paso 2 
abrir la carpeta raiz del projecto "hospital" desde un editor de codigo (ej visual code)
ejecutar en la consola el siguiente comando: ```npm install```
eso instalaria todas las dependencias

- paso 3 
crear ```.env``` en la carpeta del projecto
con estos datos:
```
DB_NAME=hospitalbd
DB_USER=root
DB_PASSWORD=
DB_HOST=localhost
DB_PORT=3306
DB_DIALECT=mysql
DB_LOGGING=false
```

- paso opcional ejecutar el comando: ```node seeders/seed.js```
para cargar una seed

- paso 4
para ejecutar el projecto escriba : ```node app.js```

- paso 5
en su navegador ingrese a: http://localhost:3000/

autor: perez franco
