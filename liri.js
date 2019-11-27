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

var getConcert = function (bandName) {
    axios.get("https://rest.bandsintown.com/artists/" + bandName + "/events?app_id=codingbootcamp").then(
        function (response) {
            console.log("\nVenue Name: " + response.data[0].venue.name + "\n");
            console.log("City: " + response.data[0].venue.city + "\n");
            console.log("Date: " + moment(response.data[0].datetime).format("MM-DD-YYYY") + "\n");
            console.log("*****************************");
        }
    )
}

var userOptions = function (caseData, functionData) {
    switch (caseData) {
        case "movie-this":
            getMovie(functionData);
            break;
        case "concert-this":
            getConcert(functionData);
            break;
        default:
            console.log('\nPlease enter a valid LIRI command \nOptions are:\n1: spotify-this-song\n2: movie-this\n3: concert-this');

    }
}


var userInput = function (argOne, argTwo) {
    userOptions(argOne, argTwo);
};

userInput(process.argv[2], process.argv[3]);