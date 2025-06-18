const sequelize = require('../Model/db');

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

    // Datos base para seguros, contactos, usuarios, etc.
    const segurosData = [
      { nombre: 'SaludPlus' },
      { nombre: 'MedicoRed' },
      { nombre: 'VidaSegura' },
      { nombre: 'Salud Total' },
      { nombre: 'Bienestar' }
    ];
    const seguros = await Seguro.bulkCreate(segurosData);

    const contactosData = [
      { telefono: '123456789', direccion: 'Calle 1', email: 'juan@example.com' },
      { telefono: '987654321', direccion: 'Calle 2', email: 'ana@example.com' },
      { telefono: '111222333', direccion: 'Calle 3', email: 'carlos@example.com' },
      { telefono: '444555666', direccion: 'Calle 4', email: 'maria@example.com' },
      { telefono: '777888999', direccion: 'Calle 5', email: 'luis@example.com' }
    ];

    const pacientesData = [
      { nombre: 'Juan Pérez', dni: 12345678, sexo: 'M', fecha_nacimiento: new Date('1990-05-20'), contactoIndex: 0, seguroIndex: 0 },
      { nombre: 'Ana Gómez', dni: 23456789, sexo: 'F', fecha_nacimiento: new Date('1985-08-12'), contactoIndex: 1, seguroIndex: 1 },
      { nombre: 'Carlos Ruiz', dni: 34567890, sexo: 'M', fecha_nacimiento: new Date('1975-01-15'), contactoIndex: 2, seguroIndex: 2 },
      { nombre: 'María López', dni: 45678901, sexo: 'F', fecha_nacimiento: new Date('1992-09-30'), contactoIndex: 3, seguroIndex: 3 },
      { nombre: 'Luis Martínez', dni: 56789012, sexo: 'M', fecha_nacimiento: new Date('1980-03-25'), contactoIndex: 4, seguroIndex: 4 }
    ];

    const departamento = await Departamento.create({ nombre: 'Clínica General' });

    const usuariosData = [
      { nombre: 'Dr. López', contraseña: '1234', dep_id: departamento.id },
      { nombre: 'Dra. García', contraseña: 'abcd', dep_id: departamento.id },
      { nombre: 'Dr. Fernández', contraseña: 'pass', dep_id: departamento.id },
      { nombre: 'Dra. Martínez', contraseña: 'qwer', dep_id: departamento.id },
      { nombre: 'Dr. Gómez', contraseña: 'zxcv', dep_id: departamento.id }
    ];
    const usuarios = await Usuario.bulkCreate(usuariosData);

    const tipoIngreso = await TipoIngreso.create({
      nombre: 'Urgencia',
      descripcion: 'Ingreso por urgencias'
    });

    const sintomasData = [
      { nombre: 'Fiebre', descripcion: 'Temperatura mayor a 38°C' },
      { nombre: 'Dolor de cabeza', descripcion: 'Cefalea persistente' },
      { nombre: 'Tos', descripcion: 'Irritación en garganta' }
    ];
    const sintomas = await Sintoma.bulkCreate(sintomasData);

    const enfermedadesData = [
      { nombre: 'Gripe', descripcion: 'Infección viral respiratoria' },
      { nombre: 'Migraña', descripcion: 'Dolor de cabeza intenso' },
      { nombre: 'Bronquitis', descripcion: 'Inflamación de las vías respiratorias' }
    ];
    const enfermedades = await Enfermedad.bulkCreate(enfermedadesData);

    const tratamientosData = [
      { descripcion: 'Reposo y líquidos', medicamentos: 'Paracetamol' },
      { descripcion: 'Analgésicos y descanso', medicamentos: 'Ibuprofeno' },
      { descripcion: 'Antibióticos y oxígeno', medicamentos: 'Amoxicilina' }
    ];
    const tratamientos = await Tratamiento.bulkCreate(tratamientosData);

    // Crear contactos y pacientes
    const contactos = await Contacto.bulkCreate(contactosData);

    // Crear pacientes vinculando contactos y seguros
    const pacientes = [];
    for (const p of pacientesData) {
      const paciente = await Paciente.create({
        nombre: p.nombre,
        dni: p.dni,
        sexo: p.sexo,
        fecha_nacimiento: p.fecha_nacimiento,
        Contacto_id: contactos[p.contactoIndex].id,
        Seguro_id: seguros[p.seguroIndex].id
      });
      pacientes.push(paciente);
    }

    // Crear ingresos, diagnósticos, internaciones, camas, habitaciones y alas
    for (let i = 0; i < pacientes.length; i++) {
      const paciente = pacientes[i];
      const usuario = usuarios[i % usuarios.length];
      const sintoma = sintomas[i % sintomas.length];
      const enfermedad = enfermedades[i % enfermedades.length];
      const tratamiento = tratamientos[i % tratamientos.length];

      const ingreso = await Ingreso.create({
        id_usuario: usuario.id,
        id_paciente: paciente.id,
        id_TI: tipoIngreso.id
      });

      await ingreso.addSintomas([sintoma.id]);

      const diagnostico = await Diagnostico.create({
        detalles: `Diagnóstico para ${paciente.nombre}`,
        enfermedad_id: enfermedad.id,
        tratamiento_id: tratamiento.id,
        usuario_id: usuario.id,
        paciente_id: paciente.id
      });

      const ala = await Ala.create({ nombre: `Ala ${i + 1}` });
      const habitacion = await Habitacion.create({ numero: 100 + i, ala_id: ala.id });
      const cama = await Cama.create({ ocupada: false, limpia: true, habitacion_id: habitacion.id });

      await Internacion.create({
        estado: true,
        diagnostico_id: diagnostico.id,
        cama_id: cama.id,
        Ingreso_id: ingreso.id
      });
    }

    console.log('✅ Seed completado con múltiples registros fijos');
  } catch (error) {
    console.error('❌ Error en el seed:', error);
  } finally {
    await sequelize.close();
  }
})();
