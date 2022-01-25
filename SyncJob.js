const axios = require("axios");

const apiKey = '';
const movieApiURL = 'https://api.themoviedb.org/3/movie';

function Sync() {

    //Run query to delete all records
    //delete from movies

    //Get the movies and insert to sql server
    axios.get(`${movieApiURL}/popular?api_key=${apiKey}&language=en-US&page=1`).then(function (response) {
        var query = '';

        for (let index = 0; index < response.data.results.length; index++) {
            const element = response.data.results[index];
            query += `insert into movies(id,title) values('${element.id}','${element.title}');`;
        }

        console.log(query);
    });
}

module.exports.sync = Sync;