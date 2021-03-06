const express = require('express');
const axios = require('axios');

const app = express();
const port = 5000;
const apiKey = '';
const movieApiURL = 'https://api.themoviedb.org/3/movie';

//Logger middleware to log requests
app.use((req, res, next) => {
    const date = new Date();
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

    if (!req.params.id) {
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

const data = [
  {
    externalStateEvaluationReference: "de4f3c04-d440-4c20-8132-ff30eaf1f69a",
    externalUnitId: "finnvedensbils-api:3032",
    selectedValuationDefectIds: [1, 2, 3, 4, 5],
    parentValuationId: 37229,
    regNo: "CF66090"
  },
  {
    externalStateEvaluationReference: "92c74956-bad5-4885-911f-88d366c6f15d",
    externalUnitId: "finnvedensbils-api:3032",
    selectedValuationDefectIds: [1, 2, 3, 4, 5],
    parentValuationId: 37168,
    regNo: "CF66091"
  },
  {
    externalStateEvaluationReference: "49412c6d-96fe-4b29-a7c2-c4ef91796a88",
    externalUnitId: "finnvedensbils-api:3032",
    regNo: "CF66085"
  }
];

app.get("/valuations/:valuationId", function (req, res) {
  res.setHeader("Content-Type", "application/json");

  console.log(req.params.valuationId);
  const item = data.find(
    (x) => x.externalStateEvaluationReference === req.params.valuationId
  );

  res.send(JSON.stringify(item));
});

app.get("/gateway/:externalref", function (req, res) {
  // res.setHeader("Content-Type", "application/json");
  res.send(JSON.stringify("https://95pqth.sse.codesandbox.io/"));
});

app.listen(process.env.PORT, () => {
    console.log(`App listening at http://localhost:${port}`)
});
