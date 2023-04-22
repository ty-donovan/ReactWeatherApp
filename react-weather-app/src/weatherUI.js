import React, { useEffect, useState } from 'react';
import { Grid } from '@material-ui/core';
import './styles.css';
import { WiCloudyGusts, WiDaySnow, WiCloudy, WiDaySunny, WiDayShowers, WiDayRain, WiDayThunderstorm } from 'weather-icons-react';
import WeatherItem from './weatherItem';

export default function WeatherUI({ zip }) {
    const API_KEY = process.env.REACT_APP_OPEN_WEATHER_api_key;
    const [location, setLocation] = useState({ name: "Charlottesville", lat: "38.0339", lon: "-78.4924" }); // location [city, state
    // console.log(API_KEY, zip)
    const [displayCondition, setDisplayCondition] = useState(WiDaySunny); // displayed condition [icon]
    // weather const { id, main, feels_like, temp }
    // console.log(location.lon)
    const [weatherFiveDay, setWeatherFiveDay] = useState([]);
    // const [weather, setWeather] = useState({ id: 800, main: "", feels_like: 0, temp: 0 });
    const LOCATIONURL = `https://api.openweathermap.org/geo/1.0/zip?zip=${zip},US&appid=${API_KEY}`;
    const WEATHERURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${location.lat}&lon=${location.lon}&units=metric&appid=${API_KEY}`;

    useEffect(() => {
        fetch(WEATHERURL)
            .then(res => res.json())
            .then(data => setWeatherFiveDay(data.list))
            .catch(err => console.log("error fetching data from API: ", err));
    }, [zip, WEATHERURL]);

    useEffect(() => {
        fetch(LOCATIONURL)
            .then(res => res.json())
            .then(data => {
                setLocation({ name: data.name, lat: data.lat, lon: data.lon });
            })
            .catch(err => console.log("error fetching data from API: ", err));
    }, [zip, LOCATIONURL]);

    // useEffect(() => {
    //     fetch(WEATHERURL)
    //         .then(res => res.json())
    //         .then(data => {
    //             const temp = data.current.temp;
    //             const feels_like = data.current.feels_like;
    //             const main = data.current.weather[0].main;
    //             const id = data.current.weather[0].id;
    //             setWeather({ id, main, feels_like, temp });
    //         })
    //         .catch(err => console.log("error fetching data from API: ", err));
    //         // console.log(currentCondition);
    // }, [location, WEATHERURL]);

    const getIconFromWeatherId = (weatherId) => {
        let currentCondition = weatherId.toString().charAt(0);
        switch (currentCondition) {
            case '2':
                return <WiDayThunderstorm size={150} color='#000' />;
            case '3':
                return <WiDayShowers size={150} color='#000' />;
            case '5':
                return <WiDayRain size={150} color='#000' />;
            case '6':
                return <WiDaySnow size={150} color='#000' />;
            case '7':
                return <WiCloudyGusts size={150} color='#000' />;
            case '8':
                if (weatherId === 800) {
                    return <WiDaySunny size={150} color='#000' />;
                } else {
                    return <WiCloudy size={150} color='#000' />;
                }
            default:
                return <WiDaySunny size={150} color='#000' />;
        }
    };

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
                            {getIconFromWeatherId(weatherFiveDay[0].weather[0].id)}
                        </Grid>
                        <Grid item xs={6}>
                            <h2>{weatherFiveDay[0].weather[0].main}</h2>
                            <h2>Current Temperature: {weatherFiveDay[0].main.temp}°C</h2>
                            <h2>Feels like: {weatherFiveDay[0].main.feels_like}°C</h2>
                        </Grid>
                        <Grid item xs={1}></Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <WeatherItem key="1" id={weatherFiveDay[1].weather[0].id} temp={weatherFiveDay[1].main.temp} main={weatherFiveDay[1].weather[0].main}/>
                </Grid>
                <Grid item xs={12}>
                    <WeatherItem key="2" id={weatherFiveDay[2].weather[0].id} temp={weatherFiveDay[2].main.temp} main={weatherFiveDay[2].weather[0].main}/>
                </Grid>
                <Grid item xs={12}>
                    <WeatherItem key="3" id={weatherFiveDay[3].weather[0].id} temp={weatherFiveDay[3].main.temp} main={weatherFiveDay[3].weather[0].main}/>
                </Grid>
                <Grid item xs={12}>
                    <WeatherItem key="4" id={weatherFiveDay[4].weather[0].id} temp={weatherFiveDay[4].main.temp} main={weatherFiveDay[4].weather[0].main}/>
                </Grid>
                <Grid item xs={12}>
                    <WeatherItem key="5" id={weatherFiveDay[5].weather[0].id} temp={weatherFiveDay[5].main.temp} main={weatherFiveDay[5].weather[0].main}/>
                </Grid>
            </Grid>
        </div>
    )
}