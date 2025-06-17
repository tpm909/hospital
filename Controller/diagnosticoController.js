const Paciente = require("../Model/Paciente")
const Ingreso = require("../Model/ingreso")
const Tipo_ingreso = require("../Model/Tipo_ingreso")
const Sintomas = require("../Model/Sintomas")
const Enfermedades = require("../Model/enfermedades")
const Tratamientos = require("../Model/Tratamientos")
const Diagnostico = require("../Model/Diagnostico")
const Habitaciones = require("../Model/Habitacion")
const Camas = require("../Model/Camas")
const Internaciones = require("../Model/internacion")

const { Op } = require('sequelize')

async function crear(req, res) {
  const info = req.body

  try {

    const diag = {
      enfermedad_id: info.Enfermedad_id,
      tratamiento_id: info.Tratamiento_id,
      detalles: info.detalles,
      paciente_id: info.paciente
    }

    const diagnostico = await Diagnostico.create(diag)//crea el diagnostico

    if (info.internacion) {
      console.log(info.habitacion);


      ////verificamos si estan todas las condiciones para internar a alguien

      if (!info.habitacion) { throw { code: 'NO_HABITACION', message: "no se cargo la habitacion" }; }

      const diagnosticos = await Diagnostico.findAll(//filtro diagnosticos que pertenezcan a nuestro paciente
        {
          where: { paciente_id: info.paciente }
        }
      )

      const id_diag = [...new Set(diagnosticos.map(c => c.id))];//sacamos los id y se eliminan los duplicados

      if (diagnosticos.length === 0) { throw { code: 'NO_DIAGNOSTICO', message: "El paciente no está diagnosticado" }; }//si no hay diagnosticos entoces no podemos internarlo

      const intnA = await Internaciones.findAll({//filtramos las internaciones para ver si el paciente ya esta internado
        where: { diagnostico_id: id_diag, estado: true }
      }
      )

      if (intnA.length > 0) { throw { code: 'INTERNACION ACTIVA', message: "el paciente tiene una internacion activa" }; }//si hay una internacion activa entoces no podemos internarlo

      const ultimoingreso = await Ingreso.findOne({
        where: { id_paciente: info.paciente },
        order: [['createdAt', 'DESC']]
      });

      if (!ultimoingreso) { throw { code: 'NO_INGRESO', message: "El paciente no está ingresado" }; }//retorna un error si no hay al menos un ingreso registrado


      const internacion = await Internaciones.create({
        diagnostico_id: diagnostico.id,
        cama_id: info.habitacion,//asigna el id de la cama
        Ingreso_id: ultimoingreso.id,
        estado: true
      })

      if (!internacion) { throw { code: 'ERROR_AL_CREAR', message: "error al crear la internacion" }; }

      await Camas.update(
        {
          ocupada: true
        },
        {
          where: { id: info.habitacion }

        }
      )


      res.redirect('/pacientes/ver?id=' + info.paciente)
    } else {
      res.redirect('/pacientes/ver?id=' + info.paciente)
    }


  } catch (error) {
    console.error(error)
    res.status(500).render('ingreso/inicio', {
      error: 'Error al crear el ingreso'
    })
  }


}

async function diagnosticoForm(req, res) {
  const id = req.query.id;

  try {
    const paciente = await Paciente.findOne({ where: { id } });//buscamos al paciente por su id
    const tratamientos = await Tratamientos.findAll();//buscamos los tratamientos     
    const enfermedades = await Enfermedades.findAll();//buscamos las enfermedades
    const habitaciones = await camasDisponibles();//buscamos las camas disponibles las habitaciones tienen estos datos id, camaId, ala_id, createdAt, updateAt 


    //////renderizamos la vista con las camas filtradas,los tratamientos, las enfermedades y el paciente 
    res.render("diagnostico/form", {
      paciente,
      tratamientos,
      enfermedades,
      habitaciones
    });

  } catch (error) {
    console.error(error);
    res.status(500).render("/", {
      error: "Paciente no encontrado"
    });
  }
}


async function camasDisponibles() {
  ///////primero buscamos las camas libres para saber que habitaciones hay disponibles, luego revisamos si esas habitaciones tienen camas ocupadas

  const camasLibres = await Camas.findAll({//filtramos las camas(y la habitancion a la que pertenecen) por su estado
    where: { ocupada: false, limpia: true },
    include: [{ model: Habitaciones }]
  });

  const habitacionesCamasLibres = [...new Set(camasLibres.map(c => c.habitacion_id))];//agarramos el id de las habitaciones con camas libres


  const camasOcupadas = await Camas.findAll({//filtramos las camas ocupadas que comparten habitacion con las libres
    where: {
      ocupada: true,
      habitacion_id: habitacionesCamasLibres
    }
  });

  const idsCamasOcupadas = camasOcupadas.map(c => c.id);//filtramos para solo tener el id de las camas ocupadas

  ////ahora usamos las camas ocupadas para buscar a los pacienes alojados en ellas

  const internaciones = await Internaciones.findAll({//buscamos las internaciones activas con las camas ocupadas, traemos sus respectivos diagnosticos y pacientes
    where: {
      estado: true,
      cama_id: idsCamasOcupadas
    },
    include: [
      {
        model: Diagnostico,
        include: [{ model: Paciente }]
      },
      {
        model: Camas
      }
    ]
  });

  ///////ahora vamos a filtrar la habitaciones que corresponden con el sexo de nuestro paciente

  const habitacionesMismoSexo = new Set();//usamos set para evitar repetidos
  const habitacionesOcupadas = new Set();

  //////usamos un bucle forEach para filtrar las habitaciones ocupadas por sexo

  internaciones.forEach(internacion => {//recoremos con un forEach las internaciones
    const pac = internacion.Diagnostico?.Paciente;//agarramos al paciente del diagnostico que pertenece a la internacion
    const cama = internacion.Cama;//agarramosla cama de la internacion

    if (cama) {//vemos si hay una cama
      habitacionesOcupadas.add(cama.habitacion_id);//agregamos la cama al set de habitacionesOcupadas

      if (pac && pac.sexo?.toLowerCase() === paciente.sexo?.toLowerCase()) {//revisamos si hay un paciente(en la internacion) y revisamos que el sexo encaje con nuestro paciente
        habitacionesMismoSexo.add(cama.habitacion_id);//si encaja los agregamos
      }
    }
  });

  ///////filtramos las habitaciones vacias
  const habitacionesVacias = camasLibres
    .map(c => c.habitacion_id)
    .filter(id => !habitacionesOcupadas.has(id));

  habitacionesVacias.forEach(id => habitacionesMismoSexo.add(id)); //y las agregamos también

  /////// Filtramos las camas libres que estén en habitaciones válidas(mismo sexo o vacías)
  const habitacionesMap = new Map();

  camasLibres.forEach(cama => {//este foreach es para agregar las camas a las habitaciones validas
    const habitacionId = cama.habitacion_id;

    if (
      habitacionesMismoSexo.has(habitacionId) &&
      !habitacionesMap.has(habitacionId)
    ) {
      habitacionesMap.set(habitacionId, {
        ...cama.Habitacion.dataValues,
        camaId: cama.id // Solo una cama por habitación
      });
    }
  });

  const habitacionesFinales = Array.from(habitacionesMap.values());

  return habitacionesFinales
}


module.exports = {
  crear,
  diagnosticoForm
}