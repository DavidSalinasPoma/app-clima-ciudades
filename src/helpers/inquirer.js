// Importar paquetes o mudulos
const inquirer = require('inquirer');
const colors = require('colors');

// Menu options configuración requirer
const listaOpciones = [
  {
    type: 'list',
    name: 'opcion',
    message: '¿Qué decea hacer?\n',
    choices: [
      {
        value: 1,
        name: `${'1.'.green} Buscar Ciudad`,
      },
      {
        value: 2,
        name: `${'2.'.green} Historial`,
      },
      {
        value: 0,
        name: `${'0.'.green} Salir`,
      },
    ],
  },
];

const opcionPausaMenu = [
  {
    type: 'input',
    name: 'enter',
    message: `Presione ${'ENTER'.green} para continuar\n`,
  },
];

class Inquirer {
  constructor() {}

  // Metodo de la clase para diseñar un menu
  async inquirerMenu() {
    // Limpia la consola
    console.clear();
    console.log('======================'.green);
    console.log('Seleccione una opción'.white);
    console.log('======================\n'.green); // Este tiene un salto de linea

    // Destructurando objetos
    const { opcion } = await inquirer.prompt(listaOpciones);
    return opcion;
  }

  // Metodo de la clase
  async pausaMenu() {
    console.log('\n');
    await inquirer.prompt(opcionPausaMenu);
  }

  // Metodo que lee del input desde la consola
  async leerInput(message) {
    const question = [
      {
        type: 'input',
        name: 'desc',
        message: message,
        validate(value) {
          if (value.length === 0) {
            return 'Por favor ingrese un valor\n';
          }
          return true;
        },
      },
    ];

    const { desc } = await inquirer.prompt(question);
    return desc;
  }

  // Metdo para listar tareas a borrar
  async listadoLugares(lugares = []) {
    const choices = lugares.map((lugar, i) => {
      const idx = `${i + 1}.`.green;
      return {
        value: lugar.id,
        name: `${idx} ${lugar.nombre}`,
      };
    });

    choices.unshift({
      value: '0',
      name: '0.'.green + 'Cancelar',
    });

    // Preguntas
    const preguntas = [
      {
        type: 'list',
        name: 'id',
        message: 'Seleccione lugar\n',
        choices,
      },
    ];

    // Destructurando objetos
    const { id } = await inquirer.prompt(preguntas);

    return id;
  }

  // Metodo para confirmar si se va a eliminar
  async confirmarEliminacion(message) {
    const question = [
      {
        type: 'confirm',
        name: 'ok',
        message,
      },
    ];
    const { ok } = await inquirer.prompt(question);
    return ok;
  }

  // Moetodo borrado multiple de tareas
  async mostrarListadoCheckList(tareas = []) {
    const choices = tareas.map((tarea, i) => {
      const idx = `${i + 1}.`.green;
      return {
        value: tarea.id,
        name: `${idx} ${tarea.desc}`,
        checked: tarea.completadoEn ? true : false,
      };
    });

    // Preguntas
    const pregunta = [
      {
        type: 'checkbox',
        name: 'ids',
        message: 'Seleccione\n',
        choices,
      },
    ];

    // Destructurando objetos
    const { ids } = await inquirer.prompt(pregunta);

    return ids;
  }
}

module.exports = {
  Inquirer,
};
