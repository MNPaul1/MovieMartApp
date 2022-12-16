const express = require("express");
const axios = require("axios");
const dotenv = require("dotenv");
const app = express();
dotenv.config({path:'./config/config.env'})

const PORT = process.env.PORT || 3000
const {X_API_KEY, X_API_HOST} = process.env
const TOP_MOVIES = []
const options = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': X_API_KEY,
        'X-RapidAPI-Host': X_API_HOST
    }
};

// API TYPE : GET
// API FUNCTION : GET ALL MOVIES DATA FOR HOME PAGE

app.get("/", (req, res) => {
    options.url = 'https://imdb8.p.rapidapi.com/title/get-top-rated-movies'
    axios.request(options).then(function (response) {
        TOP_MOVIES.push(response.data)
        res.writeHead(200, {
            'Content-Type': 'application/json',
            'X-Powered-By': 'Express.js'
        })
        res.end(JSON.stringify({
            success: true,
            data: response.data
        }))
    }).catch(function (error) {
        console.error(error);
        res.status(500).end(JSON.stringify({
            success: false,
            data: null,
            error: 'Server Error'
        }));
})
});
app.get("/title/:id",(req,res) =>{
    res.send(req.params.id)
})


app.listen(PORT, () => {
    console.log(`Server is running in ${process.env.NODE_ENV} at port ${PORT}`)
})