require("dotenv").config();

const API_KEY = process.env.WEATHER_API_KEY;

async function getCurrentWeather(location, units = 'celsius') {
  const url = `http://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${location}&aqi=no`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      // Parse the JSON error response
      const errorData = await response.json();
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
      console.log("Invalid units provided. Defaulting to Celsius.")
      temperature = `${data.current.temp_c}°C`;
    }

    const weatherData = {
      city: data.location.name,
      region: data.location.region,
      country: data.location.country,
      temperature: temperature,
      condition: data.current.condition.text,
    };

    console.log(`
      Weather in ${weatherData.city}, ${weatherData.region}, ${weatherData.country}:
      Temperature: ${weatherData.temperature}
      Condition: ${weatherData.condition}
      `);
  } catch (error) {
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