const axios = require('axios');

// Base URL de la API
const baseUrl = 'https://earthquake.usgs.gov/fdsnws/event/1';

// Función para hacer una solicitud a la API
const fetchData = async (method, params = {}) => {
    try {
        // Construir la URL de la solicitud
        const url = `${baseUrl}/${method}`;
        
        // Agregar parámetros a la solicitud
        const response = await axios.get(url, { params });
        
        // Mostrar los datos obtenidos
        console.log(response.data);
    } catch (error) {
        console.error('Error al obtener datos:', error.message);
    }
};

// Métodos disponibles de la API
const getApplicationJson = () => fetchData('application.json');
const getCatalogs = () => fetchData('catalogs');
const getContributors = () => fetchData('contributors');
const getVersion = () => fetchData('version');
const queryEarthquakes = (startTime, endTime, minMagnitude = 5) => {
    const params = {
        format: 'geojson',
        starttime: startTime,
        endtime: endTime,
        minmagnitude: minMagnitude,
    };
    return fetchData('query', params);
};

// Ejemplo de uso
(async () => {
    // Obtener versión de la API
    await getVersion();

    // Obtener catálogos disponibles
    await getCatalogs();

    // Consultar terremotos en un rango de fechas
    const startTime = '2024-01-01';
    const endTime = '2024-11-01';
    await queryEarthquakes(startTime, endTime);
})();
