import React from 'react';
import { Grid } from '@material-ui/core';
import './styles.css';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import WbCloudyIcon from '@mui/icons-material/WbCloudy';
import ThunderstormIcon from '@mui/icons-material/Thunderstorm';
import WaterDropIcon from '@mui/icons-material/WaterDrop'; // rain
import AcUnitIcon from '@mui/icons-material/AcUnit';
import AirIcon from '@mui/icons-material/Air';
import Brightness4Icon from '@mui/icons-material/Brightness4'; // partly cloudy

export default function WeatherUI( zip ) {


    return (
        <div className='ui'>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <h1>Location</h1>
                </Grid>
                <Grid item xs={12}>
                    <WbSunnyIcon fontSize="large"/>
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