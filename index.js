const express = require('express');
const axios = require('axios');

const app = express();
const port = 5000;
const apiKey = '';
const movieApiURL='https://api.themoviedb.org/3/movie';

//Logger middleware to log requests
app.use((req, res, next) => {
    const date=new Date();
    console.log(`${date} Request received at ${req.url} with parameters ${JSON.stringify(req.params)}`);
    next();
});

app.get('/movies/popular/:page', (req, res) => {
    axios.get(`${movieApiURL}/popular?api_key=${apiKey}&language=en-US&page=${req.params.page || 1}`)
        .then(response => {
            res.send(response.data);
        })
        .catch(error => {
            throw new Error(error);
        });
});

app.get('/movies/latest', (req, res) => {
    axios.get(`${movieApiURL}/latest?api_key=${apiKey}&language=en-US`)
        .then(response => {
            res.send(response.data);
        })
        .catch(error => {
            throw new Error(error);
        });
});

app.get('/movies/:id', (req, res) => {

    if(!req.params.id)
    {
        throw new Error('Please provide a movie id');
    }

    axios.get(`${movieApiURL}/${req.params.id}?api_key=${apiKey}&language=en-US`)
    .then(response => {
        res.send(response.data);
    })
    .catch(error => {
        throw new Error(error);
    });
});

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`)
});