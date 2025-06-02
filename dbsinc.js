const sequelize = require("./Model/db");

// Importamos todos los models para el funcionamiento del async
require("./Model/Ala");
require("./Model/Camas");
require("./Model/Contacto");
require("./Model/Departamento");
require("./Model/Diagnostico");
require("./Model/Habitacion");
require("./Model/Paciente");
require("./Model/Seguros");
require("./Model/Sintomas");
require("./Model/Tipo_ingreso");
require("./Model/Tratamientos");
require("./Model/Usuarios");
require("./Model/enfermedades");
require("./Model/ingreso");
require("./Model/internacion");


(async () => {
  try {
    console.log("Conectando a la base de datos...");
    await sequelize.sync({ force: false }); // true para reiniciar la BD
    console.log("¡Las tablas fueron creadas con exito!");
  } catch (error) {
    console.error("Error en la base de datos:", error);
  }
})();