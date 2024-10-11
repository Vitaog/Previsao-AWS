import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState('');

  // Substitua com sua chave de API da OpenWeather
  const apiKey = '099e7d195cf72237a2464c212d20e148';

  const handleCityChange = (event) => {
    setCity(event.target.value);
  };

  const getWeather = async () => {
    if (city.trim() === '') {
      setError('Por favor, insira o nome de uma cidade.');
      return;
    }

    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=pt_br`
      );
      setWeatherData(response.data);
      setError(''); // Limpa qualquer erro anterior
    } catch (error) {
      setError('Cidade não encontrada ou erro ao buscar os dados.');
      setWeatherData(null);
    }
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Consulta de Clima</h1>
      <input
        type="text"
        value={city}
        onChange={handleCityChange}
        placeholder="Digite o nome da cidade"
        style={{ padding: '10px', width: '300px', fontSize: '16px' }}
      />
      <button
        onClick={getWeather}
        style={{
          padding: '10px 20px',
          marginLeft: '10px',
          fontSize: '16px',
          cursor: 'pointer'
        }}
      >
        Buscar Clima
      </button>

      {error && <p style={{ color: 'red', marginTop: '20px' }}>{error}</p>}

      {weatherData && (
        <div style={{ marginTop: '20px' }}>
          <h2>{weatherData.name}</h2>
          <p>Temperatura: {weatherData.main.temp}°C</p>
          <p>Sensação Térmica: {weatherData.main.feels_like}°C</p>
          <p>Clima: {weatherData.weather[0].description}</p>
          <p>Humidade: {weatherData.main.humidity}%</p>
          <p>Vento: {weatherData.wind.speed} m/s</p>
        </div>
      )}
    </div>
  );
}

export default App;
