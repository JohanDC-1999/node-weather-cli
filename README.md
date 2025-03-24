# 🌦️ Weather App

A simple command-line weather application that fetches current weather data from [WeatherAPI.com](https://www.weatherapi.com/).

## ✨ Features

- 🌡️ Displays current weather information, including temperature and conditions.
- 🔄 Supports unit selection (Celsius or Fahrenheit) via command-line argument.
- 🚨 Handles invalid city names and API errors gracefully.

## 📌 Prerequisites

- **Node.js** (>= 18.0.0) and **npm** installed.
- A **WeatherAPI.com API key** (Get one [here](https://www.weatherapi.com/)).

## 📦 Dependencies
This project uses the following npm packages:
- [**dotenv**](https://www.npmjs.com/package/dotenv) - Loads environment variables from a `.env` file.

These dependencies are automatically installed when you run `npm install` as mentioned below

## ⚙️ Installation

1. **Clone the repository**  
   ```sh
   git clone https://github.com/JohanDC-1999/node-weather-cli.git
   cd node-weather-cli
   ```

2. **Install dependencies**  
    ```sh
    npm install
    ```

3. **Set up environment variables**  
    Create a .env file in the project root and add your API key:
    ```sh
    WEATHER_API_KEY=YOUR_API_KEY
    ```
## 🚀 Usage

```sh
node app.js "<city>" [units]
```
- `<city>`: The city name for which you want to get weather information. Use quotes for city names with spaces (e.g., "New York").
- `[units]` (optional): Choose celsius (or c) or fahrenheit (or f). Defaults to Celsius.

## 📌 Examples
```sh
node app.js London
node app.js "New York" f
```

## 📚 Resources
- [Using Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch)
- [dotenv Official](https://www.npmjs.com/package/dotenv)
- [Fetching data with Node.js](https://nodejs.org/en/learn/getting-started/fetch)