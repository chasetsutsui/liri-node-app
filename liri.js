require("dotenv").config();

var keys = require("./keys.js");
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);
var axios = require("axios");
var moment = require("moment");
var fs = require("fs");

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
var getArtist = function (artist) {
    return artist.name;
}

var getSpotify = function (songName) {
    spotify.search({ type: 'track', query: songName }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }

        var songs = data.tracks.items;
        for (var i = 0; i < songs.length; i++) {
            console.log(i);
            console.log("\nartist: " + songs[i].artists.map(getArtist) + "\n");
            console.log("song: " + songs[i].name + "\n");
            console.log("preview song: " + songs[i].preview_url + "\n");
            console.log("album: " + songs[i].album.name + "\n");
            console.log("*****************************");

        }
    });
}
var doWhatItSays = function () {
    fs.readFile("random.txt", "utf8", function (err, data) {
        if (err) throw err;
        var dataArr = data.split(",");

        userOptions(dataArr[0], dataArr[1]);

    });
}

var userOptions = function (caseData, functionData) {
    switch (caseData) {
        case "movie-this":
            getMovie(functionData);
            break;
        case "concert-this":
            getConcert(functionData);
            break;
        case "spotify-this-song":
            getSpotify(functionData);
            break;
        case "do-what-it-says":
            doWhatItSays();
            break
        default:
            console.log('\nPlease enter a valid LIRI command \nOptions are:\n1: spotify-this-song\n2: movie-this\n3: concert-this\n4: do-what-it-says');

    }
}

var userInput = function (argOne, argTwo) {
    userOptions(argOne, argTwo);
};

userInput(process.argv[2], process.argv[3]);