import React, { useEffect } from "react";
import { Grid } from '@material-ui/core';
import './styles.css';
import { WiCloudyGusts, WiDaySnow, WiCloudy, WiDaySunny, WiDayShowers, WiDayRain, WiDayThunderstorm } from 'weather-icons-react';
import { useState } from "react";

export default function WeatherItem({ key, id, temp, main, day }) {
    const ICONCOLOR = "#fefae0";

    const getIconFromWeatherId = (weatherId) => {
        if (weatherId === undefined) {
            weatherId = "800";
        } else {
            let currentCondition = weatherId.toString().charAt(0);
        switch (currentCondition) {
            case '2':
                return <WiDayThunderstorm size={80} color={ICONCOLOR} />;
            case '3':
                return <WiDayShowers size={80} color={ICONCOLOR} />;
            case '5':
                return <WiDayRain size={80} color={ICONCOLOR} />;
            case '6':
                return <WiDaySnow size={80} color={ICONCOLOR} />;
            case '7':
                return <WiCloudyGusts size={80} color={ICONCOLOR} />;
            case '8':
                if (weatherId === 800) {
                    return <WiDaySunny size={80} color={ICONCOLOR} />;
                } else {
                    return <WiCloudy size={80} color={ICONCOLOR} />;
                }
            default:
                return <WiDaySunny size={80} color={ICONCOLOR} />;
            }
        };
    }

    const getTemp = temp => {
        if (temp === undefined) {
            return "loading";
        } else {
            return temp;
        }
    }

    const getConditon = main => {
        if (main === undefined) {
            return "loading";
        } else {
            return main;
        }
    }

    return (
        <div>
            <Grid container spacing={2}>
                <Grid item xs={2}></Grid>
                <Grid item xs={3}>
                    {getIconFromWeatherId(id)}
                </Grid>
                <Grid item xs={6}>
                    <h3>{day}: {getConditon(main)}</h3>
                    <h3>Temp: {getTemp(temp)}°C</h3>
                </Grid>
                    <Grid item xs={1}></Grid>
            </Grid>
        </div>
    );
}