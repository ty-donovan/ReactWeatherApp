import React from 'react';
import { Grid } from '@material-ui/core';
import './styles.css';
import WeatherUI from './weatherUI';
import NewsUI from './newsUI';
import { TextField, Button } from '@material-ui/core';
import { useState } from 'react';

export default function UI() {
    const [zipCode, setZipCode] = useState('22903'); // zip code
    const [hiddenZip, setHiddenZip] = useState('22903'); // hidden zip code
    const [error, setError] = useState(""); // error

    const handleZipCodeOnEnter = e => {
        if (e.key === 'Enter' || e.type === 'click') {
            const text = e.target.value.trim();
            if (text.length === 5 && !isNaN(text)) {
                setZipCode(text);
            } else if (text.length > 0) {
                setError("true");
            }
        }
    }

    const handleHiddenZip = e => {
        if (validInput(e.target.value)) {
            setHiddenZip(e.target.value);
        } else if (e.target.value.length > 0) {
            setError("");
        }
    }

    const handleZipCodeOnClick = e => {
        setZipCode(hiddenZip);
    }

    const buttonStyle = {
        height: '100%',
        marginLeft: '10px',
        background: '#FEFAE0',
        color: '#000000'
    };

    const validInput = (input) => {
        if (input.length === 5 && !isNaN(input)) {
            return true;
        } else {
            return false;
        }
    }


    return (
        <div>
            <div className='navbar-wrapper'>
                <div className='navbar'>
                    <TextField fullWidth style={{ background: "#FEFAE0" }} error={error} label="Zip code" variant="outlined" onKeyDown={handleZipCodeOnEnter} onChange={handleHiddenZip}/>
                </div>
                <div>
                    <Button style={buttonStyle} variant="contained" color="primary" onClick={handleZipCodeOnClick}>Search</Button>
                </div>
                {/* <p>{zipCode}</p> */}
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