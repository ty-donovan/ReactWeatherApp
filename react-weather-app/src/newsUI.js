import React from 'react';
import { Grid } from '@material-ui/core';
import './styles.css';
import { useState, useEffect } from 'react';

export default function NewsUI() {
    const API_KEY = process.env.REACT_APP_NY_TIMES_api_key;
    const [newsFeed, setNewsFeed] = useState([]); // [title, abstract, url, byline, published_date

    const NEWSURL = `https://api.nytimes.com/svc/mostpopular/v2/viewed/1.json?api-key=${API_KEY}`

    useEffect(() => {
        fetch(NEWSURL)
            .then(res => res.json())
            .then(data => setNewsFeed(data.results))
            .catch(err => console.log("error fetching data from API: ", err));
        console.log(newsFeed);
    }, []);

    return (
        <div className='ui'>
            <Grid container spacing={6}>
                <Grid item xs={12}><h1>Daily News Feed</h1></Grid>
                {newsFeed.slice(0, 5).map((news, index) => (
                    <Grid item xs={12} key={index}>
                        <h2>{news.title || "News"}</h2>
                        <a href={news.url || "#"}>Link: {news.url || "Link"}</a>
                    </Grid>
                ))}
                <Grid item xs={12}></Grid>
            </Grid>
            
        </div>
    )
}