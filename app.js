const { write } = require("fs");

require("dotenv").config();

const API_KEY = process.env.WEATHER_API_KEY;

const LOADER = ['|', '/', '-', '\\'];

function showLoader(ms = 100) {
  let i = 0;
  return setInterval(() => {
    process.stdout.write(`\r${LOADER[i % LOADER.length]} \x1b[1;31mWorking hard...`);
    i++;
  }, 100);
}

/**
 * Main function used the the current weather information
 * @param {string} location 
 * @param {string} units 
 */
async function getCurrentWeather(location, units = 'celsius') {
  const url = `http://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${location}&aqi=no`;
  const loader = showLoader(); // Start the loader

  try {
    // Make a request to the api
    const response = await fetch(url);
    if (!response.ok) {
      // Parse the JSON error response
      const errorData = await response.json();
          process.stdout.write('\r'); // Clear the loader line
      console.log(JSON.stringify(errorData)); // Log the error JSON
      throw new Error(
        `Response status: ${response.status}, Error: ${errorData.error.message}`
      );
    }

    const data = await response.json();

    let temperature;
    const lowerCaseUnits = units.toLowerCase();

    if (lowerCaseUnits === 'fahrenheit' || lowerCaseUnits === 'f') {
      temperature = `${data.current.temp_f}°F`;
    } else if (lowerCaseUnits === 'celsius' || lowerCaseUnits === 'c') {
      temperature = `${data.current.temp_c}°C`;
    } else {
      console.log("\rInvalid units provided. Defaulting to Celsius.")
      temperature = `${data.current.temp_c}°C`;
    }

    // Store the data in an object
    const weatherData = {
      city: data.location.name,
      region: data.location.region,
      country: data.location.country,
      temperature: temperature,
      condition: data.current.condition.text,
    };

    clearInterval(loader); // Stop the loader
  
    // Log the weather data to the user
    process.stdout.write(`\rHere is the weather information for ${weatherData.city}
      Weather in ${weatherData.city}, ${weatherData.region}, ${weatherData.country}:
      Temperature: ${weatherData.temperature}
      Condition: ${weatherData.condition}
      `);
  } catch (error) {
    clearInterval(loader);
    process.stdout.write('\r');
    console.error(error.message);
  }
}

const city = process.argv[2]; // Get the city from command-line arguments
const units = process.argv[3]; // Get the units for degree from command-line

if (!city) {
  console.log("Please provide a city name.");
} else {
  getCurrentWeather(city, units);
}