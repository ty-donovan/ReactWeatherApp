require("dotenv").config();

module.exports = {
    env: {
        REACT_APP_OPEN_WEATHER_api_key: process.env.REACT_APP_OPEN_WEATHER_api_key,
        REACT_APP_NY_TIMES_api_key: process.env.REACT_APP_NY_TIMES_api_key,
    },
};