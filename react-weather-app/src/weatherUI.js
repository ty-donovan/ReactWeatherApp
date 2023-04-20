import React, { useEffect, useState } from 'react';
import { Grid } from '@material-ui/core';
import './styles.css';
import { WiCloudyGusts, WiDaySnow, WiCloudy, WiDayCloudy, WiDaySunny, WiDaySunnyOvercast, WiDayShowers, WiDayRain, WiDayThunderstorm, WiDayFog } from 'weather-icons-react';

export default function WeatherUI( zip ) {
    const API_KEY = process.env.OPEN_WEATHER_api_key;
    const [location, setLocation] = useState({ name: "Charlottesville, VA", lat: 38.0339, long: -78.4924 }); // location [city, state
    // weather const { id, main, feels_like, temp }
    const [weather, setWeather] = useState({ id: 0, main: "", feels_like: 0, temp: 0 });
    const LOCATIONURL = `https://api.openweathermap.org/geo/1.0/zip?zip=${zip},US&appid=${API_KEY}}`;
    const WEATHERURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${location.lat}&lon=${location.long}&units=metric&exclude=minutely,hourly,alerts&appid=${API_KEY}`;

    useEffect(() => {
        fetch(LOCATIONURL)
            .then(res => res.json())
            .then(data => {
                setLocation({ name: data.name, lat: parseFloat(data.lat), long: parseFloat(data.lon) });
            })
            .catch(err => console.log("error fetching data from API: ", err));
    }, [zip]);

    useEffect(() => {
        fetch(WEATHERURL)
            .then(res => res.json())
            .then(data => {
                const temp = data.current.temp;
                const feels_like = data.current.feels_like;
                const main = data.current.weather[0].main;
                const id = data.current.weather[0].id;
                setWeather({ id, main, feels_like, temp });
            })
            .catch(err => console.log("error fetching data from API: ", err));
    }, [location]);

    return (
        <div className='ui'>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <h1>{location.name}</h1>
                </Grid>
                <Grid item xs={12}>
                    <WiDaySunny size={80} color="#000"/>
                </Grid>
                <Grid item xs={12}>
                    <h2>Day1</h2>
                </Grid>
                <Grid item xs={12}>
                    <h2>Day2</h2>
                </Grid>
                <Grid item xs={12}>
                    <h2>Day3</h2>
                </Grid>
                <Grid item xs={12}>
                    <h2>Day4</h2>
                </Grid>
                <Grid item xs={12}>
                    <h2>Day6</h2>
                </Grid>
            </Grid>
        </div>
    )
}