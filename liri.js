require("dotenv").config();

var keys = require("./keys.js");
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);
var axios = require("axios");
var moment = require("moment");

var getMovie = function (movieName) {

    axios.get("http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy").then(
        function (response) {
            console.log("\nMovie title: " + response.data.Title + "\n");
            console.log("Year: " + response.data.Year + "\n");
            console.log("IMDB rating: " + response.data.imdbRating + "\n");
            console.log("Country: " + response.data.Country + "\n");
            console.log("Language: " + response.data.Language + "\n");
            console.log("Plot: " + response.data.Plot + "\n");
            console.log("Actors: " + response.data.Actors + "\n");
            console.log("*****************************");

        }
    );

}



var userInput = function (argOne, argTwo) {
    userOptions(argOne, argTwo);
};

userInput(process.argv[2], process.argv[3]);