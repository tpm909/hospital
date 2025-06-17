const  sequelize  = require('../Model/db');

const Contacto = require('../Model/Contacto');
const Seguro = require('../Model/Seguros');
const Paciente = require('../Model/Paciente');
const Usuario = require('../Model/Usuarios');
const Departamento = require('../Model/Departamento');
const TipoIngreso = require('../Model/Tipo_ingreso');
const Ingreso = require('../Model/ingreso');
const Sintoma = require('../Model/Sintomas');
const Enfermedad = require('../Model/enfermedades');
const Tratamiento = require('../Model/Tratamientos');
const Diagnostico = require('../Model/Diagnostico');
const Internacion = require('../Model/internacion');
const Cama = require('../Model/Camas');
const Habitacion = require('../Model/Habitacion');
const Ala = require('../Model/Ala');

(async () => {
  try {
    await sequelize.sync({ force: true });

    const contacto = await Contacto.create({
      telefono: 123456789,
      numero_emergencia: 987654321,
      email: 'contacto@example.com',
      direccion: 'Av. Salud 123'
    });

    const seguro = await Seguro.create({
      nombre: 'SaludPlus'
    });

    const paciente = await Paciente.create({
      nombre: 'Juan Pérez',
      dni: 12345678,
      sexo: 'M',
      fecha_nacimiento: new Date('1990-05-20'),
      Contacto_id: contacto.id,
      Seguro_id: seguro.id
    });

    const departamento = await Departamento.create({
      nombre: 'Clínica Médica'
    });

    const usuario = await Usuario.create({
      nombre: 'Dr. López',
      contraseña: '1234',
      dep_id: departamento.id
    });

    const tipoIngreso = await TipoIngreso.create({
      nombre: 'Urgencia',
      descripcion: 'Ingreso por urgencias'
    });

    const ingreso = await Ingreso.create({
      id_usuario: usuario.id,
      id_paciente: paciente.id,
      id_TI: tipoIngreso.id
    });

    const sintoma = await Sintoma.create({
      nombre: 'Fiebre',
      descripcion: 'Temperatura mayor a 38°C'
    });

    const enfermedad = await Enfermedad.create({
      nombre: 'Gripe',
      descripcion: 'Enfermedad respiratoria leve'
    });

    const tratamiento = await Tratamiento.create({
      descripcion: 'Reposo y líquidos',
      medicamentos: 'Paracetamol'
    });

    const diagnostico = await Diagnostico.create({
      detalles: 'Paciente con gripe común',
      enfermedad_id: enfermedad.id,
      tratamiento_id: tratamiento.id,
      usuario_id: usuario.id,
      paciente_id: paciente.id
    });

    const ala = await Ala.create({
      nombre: 'Ala Norte'
    });

    const habitacion = await Habitacion.create({
      numero: 101,
      ala_id: ala.id
    });

    const cama = await Cama.create({
      ocupada: false,
      limpia: true,
      habitacion_id: habitacion.id
    });

    await Internacion.create({
      estado: true,
      diagnostico_id: diagnostico.id,
      cama_id: cama.id,
      Ingreso_id: ingreso.id
    });

    console.log(' Seed completado exitosamente');
  } catch (error) {
    console.error(' Error en el seed:', error);
  } finally {
    await sequelize.close();
  }
})();
