const axios = require('axios');

class Busquedas {
  historial = ['La Paz', 'Sucre', 'Cochabamba'];
  constructor() {
    // Todo: leer db si existe
  }

  // Parametros de MapBox
  get paramsMapbox() {
    return {
      access_token: process.env.MAPBOX_KEY,
      limit: 5,
      language: 'es',
    };
  }
  // Parametros de openweather
  paramsOpenWeather(lat, lon) {
    return {
      lat: lat,
      lon: lon,
      appid: process.env.OPENWEATHER_KEY,
      units: 'metric',
      lang: 'es',
    };
  }

  // metodos de la clase
  async obtenerCiudad(lugar = '') {
    // Peticion Http
    console.log('ciudad: ' + lugar);

    try {
      //   Peticion http con axios y crear instancias de axios
      const instance = axios.create({
        baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${lugar}.json`,
        params: this.paramsMapbox,
      });

      // Hacemos la peticion con los parametros
      const resp = await instance.get();

      // Extraendo datos con destructuracion de objetos
      return resp.data.features.map((lugar) => ({
        id: lugar.id,
        nombre: lugar.place_name,
        lng: lugar.center[0],
        lat: lugar.center[1],
      }));
    } catch (error) {
      return console.log('No se pudo conectar al servidor');
    }
  }

  async climaLugar(lat, lon) {
    try {
      // Instacia de axios.create()
      //   Peticion http con axios y crear instancias de axios

      // console.log(lat, lon);
      const instance = axios.create({
        baseURL: `https://api.openweathermap.org/data/2.5/weather`,
        params: this.paramsOpenWeather(lat, lon),
      });
      // resp.data
      // Hacemos la peticion con los parametros
      const resp = await instance.get();
      // console.log(resp.data);
      // Extraendo datos con destructuracion de objetos
      const { weather, main } = resp.data;
      return {
        desc: weather[0].description,
        min: main.temp_min,
        max: main.temp_max,
        temp: main.temp,
      };
    } catch (error) {
      console.log('No pudo conectarse al servidor');
    }
  }
}

// Exportar la clase para que otros puedan utilizarlas
module.exports = Busquedas;

// https://www.npmjs.com/package/request

// https://www.npmjs.com/package/fetch

// https://www.npmjs.com/package/axios

// Para pruebas rápidas del endpoint
// https://reqres.in/

// Para sacar la ciudad y el tiempo
// https://www.mapbox.com/

// Es una api de mapbox que te permite utilizar de forma gratuita cada mes
// https://docs.mapbox.com/api/search/geocoding/

// Obtener el clima segun las coordenadas
// https://openweathermap.org/api
