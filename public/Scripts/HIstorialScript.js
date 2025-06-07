     $(document).ready(function () {
     const idsTablas = ['tablaIngresos', 'tablaInternaciones', 'tablaDiagnosticos'];
     let tablaActiva = null;

     function inicializarTabla(id) {
      const tabla = $('#' + id);

      // Si hay una tabla activa, la destruye
      if (tablaActiva) {
        tablaActiva.DataTable().destroy();
        tablaActiva.hide();
      }

      // Muestra la tabla nueva y la guardarla como tablaActiva
      tabla.show();
      tablaActiva = tabla;

      // Inicializar DataTable
      tabla.DataTable({
        language: {
          url: '//cdn.datatables.net/plug-ins/1.13.6/i18n/es-ES.json'
        }
      });
     }

     // Ocultar todas las tablas inicialmente
     idsTablas.forEach(id => $('#' + id).hide());

     // Inicializar la primera tabla por defecto
     inicializarTabla('tablaIngresos');

     // Maneja el cambio de los combo
     $('#selectorTabla').on('change', function () {
      const seleccionado = $(this).val();
      inicializarTabla(seleccionado);
     });
     });