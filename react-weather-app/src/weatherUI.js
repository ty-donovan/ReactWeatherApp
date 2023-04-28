import React, { useEffect, useState } from 'react';
import { Grid } from '@material-ui/core';
import './styles.css';
import { WiCloudyGusts, WiDaySnow, WiCloudy, WiDaySunny, WiDayShowers, WiDayRain, WiDayThunderstorm } from 'weather-icons-react';
import WeatherItem from './weatherItem';

export default function WeatherUI({ zip }) {
    const API_KEY = process.env.REACT_APP_OPEN_WEATHER_api_key;
    const [location, setLocation] = useState({ name: "Charlottesville", lat: "38.0339", lon: "-78.4924" }); // location [city, state
    // console.log(API_KEY, zip)
    // weather const { id, main, feels_like, temp }
    // console.log(location.lon)
    const [weatherFiveDay, setWeatherFiveDay] = useState([]);
    const [nextFiveDays, setNextFiveDays] = useState([]); 
    // const [weather, setWeather] = useState({ id: 800, main: "", feels_like: 0, temp: 0 });
    const LOCATIONURL = `https://api.openweathermap.org/geo/1.0/zip?zip=${zip},US&appid=${API_KEY}`;
    const WEATHERURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${location.lat}&lon=${location.lon}&units=metric&appid=${API_KEY}`;

    const ICONCOLOR = "#fefae0";

    useEffect(() => {
        getDates();
    }, []);

    const getDates = () => {
        const dayOfWeek = new Date().toLocaleDateString('en-US', { weekday: 'short' });
        const shortDayOfWeek = dayOfWeek.slice(0, 3);
        const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
        const startIdx = daysOfWeek.indexOf(shortDayOfWeek);
        const nextFiveDays = [];
        for (let i = startIdx + 1; i <= startIdx + 5; i++) {
          nextFiveDays.push(daysOfWeek[i % 7]);
        }
        setNextFiveDays(nextFiveDays);
    }

    useEffect(() => {
        fetch(WEATHERURL)
            .then(res => res.json())
            .then(data => setWeatherFiveDay(data.list))
            .catch(err => console.log("error fetching data from API: ", err));
        console.log(weatherFiveDay);
    }, [zip, WEATHERURL]);

    useEffect(() => {
        fetch(LOCATIONURL)
            .then(res => res.json())
            .then(data => {
                setLocation({ name: data.name, lat: data.lat, lon: data.lon });
            })
            .catch(err => console.log("error fetching data from API: ", err));
    }, [zip, LOCATIONURL]);

    const getIconFromWeatherId = (weatherId) => {
        let currentCondition = weatherId.toString().charAt(0);
        switch (currentCondition) {
            case '2':
                return <WiDayThunderstorm size={150} color={ICONCOLOR} />;
            case '3':
                return <WiDayShowers size={150} color={ICONCOLOR} />;
            case '5':
                return <WiDayRain size={150} color={ICONCOLOR} />;
            case '6':
                return <WiDaySnow size={150} color={ICONCOLOR} />;
            case '7':
                return <WiCloudyGusts size={150} color={ICONCOLOR} />;
            case '8':
                if (weatherId === 800) {
                    return <WiDaySunny size={150} color={ICONCOLOR} />;
                } else {
                    return <WiCloudy size={150} color={ICONCOLOR} />;
                }
            default:
                return <WiDaySunny size={150} color={ICONCOLOR} />;
        }
    };

    const verifyWeatherData = (i) => {
        if (weatherFiveDay[i] === undefined) {
            return ({
                id : 800,
                temp : 0,
                main : "Sunny",
                feels_like: 0
            });
        } else {
            return ({
                id : weatherFiveDay[i].weather[0].id,
                temp : weatherFiveDay[i].main.temp,
                main : weatherFiveDay[i].weather[0].main,
                feels_like : weatherFiveDay[i].main.feels_like
            });
        }
    }

    return (
        <div className='ui'>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <h1>{location.name}</h1>
                </Grid>
                <Grid item xs={12}>
                    <Grid container spacing={2}>
                    <Grid item xs={2}></Grid>
                        <Grid item xs={3}>
                            {getIconFromWeatherId(verifyWeatherData(0).id)}
                        </Grid>
                        <Grid item xs={6}>
                            <h2>Today: {verifyWeatherData(0).main}</h2>
                            <h2>Current Temperature: {verifyWeatherData(0).temp}°C</h2>
                            <h2>Feels like: {verifyWeatherData(0).feels_like}°C</h2>
                        </Grid>
                        <Grid item xs={1}></Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <WeatherItem key="1" id={verifyWeatherData(1).id} temp={verifyWeatherData(1).temp} main={verifyWeatherData(1).main} day={nextFiveDays[0]}/>
                </Grid>
                <Grid item xs={12}>
                    <WeatherItem key="2" id={verifyWeatherData(2).id} temp={verifyWeatherData(2).temp} main={verifyWeatherData(2).main} day={nextFiveDays[1]}/>
                </Grid>
                <Grid item xs={12}>
                    <WeatherItem key="3" id={verifyWeatherData(3).id} temp={verifyWeatherData(3).temp} main={verifyWeatherData(3).main} day={nextFiveDays[2]}/>
                </Grid>
                <Grid item xs={12}>
                    <WeatherItem key="4" id={verifyWeatherData(4).id} temp={verifyWeatherData(4).temp} main={verifyWeatherData(4).main} day={nextFiveDays[3]}/>
                </Grid>
                <Grid item xs={12}>
                    <WeatherItem key="5" id={verifyWeatherData(5).id} temp={verifyWeatherData(5).temp} main={verifyWeatherData(5).main} day={nextFiveDays[4]}/>
                </Grid>
            </Grid>
        </div>
    )
}