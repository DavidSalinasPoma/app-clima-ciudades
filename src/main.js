const { Inquirer } = require('./helpers/inquirer');
const Busquedas = require('./models/busquedas');
// Para manejar variables de entorno de nuestra aplicación
require('dotenv').config();

class Main {
  constructor() {
    // Esto limpia la consola
    console.clear();
  }

  // Metodo appPrincipal
  async appMain() {
    // Declaración de variables
    const inquirer = new Inquirer();
    let opt = '';
    const busquedas = new Busquedas();

    // loop dowhile
    do {
      // Esto imprime el menu
      opt = await inquirer.inquirerMenu();

      switch (opt) {
        case 1:
          // Leer y Mostrar mensaje
          const lugar = await inquirer.leerInput('Ciudad: ');
          // Buscar los lugares
          const lugares = await busquedas.obtenerCiudad(lugar);
          // Seleccionar el lugar
          const idSeleccionado = await inquirer.listadoLugares(lugares);

          if (idSeleccionado === '0') {
            continue;
          }

          const lugarSeleccionado = lugares.find((lugar) => {
            return lugar.id === idSeleccionado;
          });

          // Guardar en DB
          busquedas.agregarHistorial(lugarSeleccionado.nombre);

          // Los datos del clima
          const clima = await busquedas.climaLugar(
            lugarSeleccionado.lat,
            lugarSeleccionado.lng,
          );
          // console.log(clima);
          // Mostrar resultados
          console.clear();
          console.log('\nInformación de la ciudad\n'.green);
          console.log('Ciudad:'.green, lugarSeleccionado.nombre);
          console.log('Lat:'.green, lugarSeleccionado.lat);
          console.log('Lng:'.green, lugarSeleccionado.lng);
          console.log('Temperatura:'.green, clima.temp);
          console.log('Mínima:'.green, clima.min);
          console.log('Máxima:'.green, clima.max);
          console.log('Como esta el clima:'.green, clima.desc);
          break;
        case 2:
          busquedas.capitalizarHistorial.forEach((lugar, id) => {
            const idx = `${id + 1}.`.green;
            console.log(`${idx} ${lugar}`);
          });
          break;
        case 0:
          break;

        default:
          break;
      }
      if (opt !== 0) {
        // Pausar el menu
        await inquirer.pausaMenu();
      }
    } while (opt !== 0);
  }
}

const main = new Main();
main.appMain();
