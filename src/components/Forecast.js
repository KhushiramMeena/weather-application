import React, { useEffect, useState } from "react";
import axios from "axios";
import { MDBRow, MDBCol } from 'mdb-react-ui-kit';
import "../styles.css";
import ReactAnimatedWeather from "react-animated-weather";

function Forecast({ weather }) {
  const { data } = weather;
  const [forecastData, setForecastData] = useState([]);
  const [isCelsius, setIsCelsius] = useState(true); // Track temperature unit

  useEffect(() => {
    const fetchForecastData = async () => {
      const apiKey = "b03a640e5ef6980o4da35b006t5f2942";
      const url = `https://api.shecodes.io/weather/v1/forecast?query=${data.city}&key=${apiKey}&units=metric`;

      try {
        const response = await axios.get(url);
        setForecastData(response.data.daily);
      } catch (error) {
        console.log("Error fetching forecast data:", error);
      }
    };

    fetchForecastData();
  }, [data.city]);

  const formatDay = (dateString) => {
    const options = { weekday: "short" };
    const date = new Date(dateString * 1000);
    return date.toLocaleDateString("en-US", options);
  };

  const getCurrentDate = () => {
    const options = {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric"
    };
    const currentDate = new Date().toLocaleDateString("en-US", options);
    return currentDate;
  };

  const toggleTemperatureUnit = () => {
    setIsCelsius((prevState) => !prevState);
  };

  const convertToCelsius = (temperature) => {
    return Math.round((temperature - 32) * (5 / 9));
  };

  const convertToFahrenheit = (temperature) => {
    return Math.round((temperature * 9) / 5 + 32);
  };

  const renderTemperature = (temperature) => {
    if (isCelsius) {
      return Math.round(temperature);
    } else {
      return convertToFahrenheit(temperature);
    }
  };

  return (


    <MDBRow className="spc">
      <div className="bdr">
    <MDBCol md='8'>
      <div className='pb-3'>
        <div className="city-name">
        <h2 className="txt">
          {data.city}, <span>{data.country}</span>
        </h2>
      </div>
      </div>
      
        <MDBRow>
           <div className="temp">
        {data.condition.icon_url && (
          <img
            src={data.condition.icon_url}
            alt={data.condition.description}
            className="temp-icon"
          />
        )}
        {renderTemperature(data.temperature.current)}
        <sup className="temp-deg status" onClick={toggleTemperatureUnit}>
          {isCelsius ? "°C" : "°F"} | {isCelsius ? "°F" : "°C"}
        </sup>
      </div>
        </MDBRow>

        <MDBRow>
          <div className="date txt">
        <span>{getCurrentDate()}</span>
      </div></MDBRow>
      <MDBRow>

       <MDBCol md='6'>
         <p className=" status weather-des">Weather : {data.condition.description}</p>
         
        </MDBCol>
       
        </MDBRow>
      <MDBRow>
       <MDBCol md='6'>
        <div className="weather-info">
        <div className="col">
          <ReactAnimatedWeather icon="WIND" size="40"/>
          <div className="txt">
            <p className="wind">{data.wind.speed}m/s</p>
            <p>Wind speed</p>
          </div>
        </div>
        </div>

        </MDBCol>
      <MDBCol md='6'>
         <div className="weather-info">
        <div className="col">
          <ReactAnimatedWeather icon="RAIN" size="40"/>
          <div className="txt">
            <p className="humidity">{data.temperature.humidity}%</p>
            <p>Humidity</p>
        </div>
        </div>
      </div>
      </MDBCol>

      </MDBRow>
    </MDBCol>
    </div>

<div >
    <MDBCol md='4'>
    <div className="forecast">
      
        <div className="forecast-container">
          {forecastData &&
            forecastData.slice(0, 3).map((day) => (
              <div className="day" key={day.time}>
                <p className="day-name">{formatDay(day.time)}</p>
                {day.condition.icon_url && (
                  <img
                    className="day-icon"
                    src={day.condition.icon_url}
                    alt={day.condition.description}
                  />
                )}
                <p className="day-temperature">
                  {Math.round(day.temperature.minimum)}°/ <span>{Math.round(day.temperature.maximum)}°</span>
                </p>
              </div>
            ))
            
            }
            </div>
            <div className="forecast-container">
             {forecastData &&
            forecastData.slice(3, 7).map((day) => (
              <div className="day" key={day.time}>
                <p className="day-name">{formatDay(day.time)}</p>
                {day.condition.icon_url && (
                  <img
                    className="day-icon"
                    src={day.condition.icon_url}
                    alt={day.condition.description}
                  />
                )}
                <p className="day-temperature">
                  {Math.round(day.temperature.minimum)}°/ <span>{Math.round(day.temperature.maximum)}°</span>
                </p>
              </div>
            ))
            
            }
        </div>
      </div>

    </MDBCol>
    </div>
  </MDBRow>


  );
}        

export default Forecast;