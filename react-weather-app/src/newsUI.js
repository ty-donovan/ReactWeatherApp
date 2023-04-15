import React from 'react';
import { Grid } from '@material-ui/core';
import './styles.css';

export default function NewsUI() {
    return (
        <div className='ui'>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <h1>News</h1>
                </Grid>
                <Grid item xs={12}>
                    <h2>News1</h2>
                </Grid>
                <Grid item xs={12}>
                    <h2>News2</h2>
                </Grid>
                <Grid item xs={12}>
                    <h2>News3</h2>
                </Grid>
                <Grid item xs={12}>
                    <h2>News4</h2>
                </Grid>
                <Grid item xs={12}>
                    <h2>News5</h2>
                </Grid>
            </Grid>
        </div>
    )
}