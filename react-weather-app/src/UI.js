import React from 'react';
import { Grid } from '@material-ui/core';
import './styles.css';
import WeatherUI from './weatherUI';
import NewsUI from './newsUI';
import { TextField, Button } from '@material-ui/core';
import { useState } from 'react';

export default function UI() {
    const [zipCode, setZipCode] = useState('22903'); // zip code
    const [hiddenZip, setHiddenZip] = useState(''); // hidden zip code
    const [error, setError] = useState(""); // error

    const handleZipCodeOnEnter = e => {
        if (e.key === 'Enter' || e.type === 'click') {
            const text = e.target.value.trim();
            if (text.length === 5 && !isNaN(text)) {
                setZipCode(text);
            } else {
                setError("true");
            }
        }
    }

    const handleHiddenZip = e => {
        setError("");
        setHiddenZip(e.target.value);
    }

    const handleZipCodeOnClick = e => {
        setZipCode(hiddenZip);
    }

    const buttonStyle = {
        height: '100%',
        marginLeft: '10px',
      };


    return (
        <div>
            <div className='navbar-wrapper'>
                <div className='navbar'>
                    <TextField fullWidth error={error} label="Zip code" variant="outlined" onKeyDown={handleZipCodeOnEnter} onChange={handleHiddenZip}/>
                </div>
                <div>
                    <Button style={buttonStyle} variant="contained" color="primary" onClick={handleZipCodeOnClick}>Search</Button>
                </div>
                <p>{zipCode}</p>
            </div>
            <Grid container spacing={2}>
                <Grid item xs={6}>
                    <WeatherUI zip={zipCode}/>
                </Grid>
                <Grid item xs={6}>
                    <NewsUI />
                </Grid>
            </Grid>
        </div>
    )
}