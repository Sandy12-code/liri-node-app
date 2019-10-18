// REQUIRE .env FILE
require("dotenv").config();

// REQUIRE REQUEST
let request = require("request");

//AXIOS REQUEST
var axios = require("axios");

// REQUIRE MOMENT
var moment = require('moment');

// REQUIRE FILE SYSTEMS
var fs = require("fs");

// LINK KEY PAGE
var keys = require("./keys.js");

//INITIALIZE SPOTIFY
var Spotify = require("node-spotify-api");
var spotify = new Spotify(keys.spotify);

// OMDB AND BANDS IN TOWN API'S
let omdb = (keys.omdb);
let bandsintown = (keys.bandsintown);

// TAKE USER COMMAND AND INPUT
var userInput = process.argv[2];
var userQuery = process.argv.slice(3).join(" ");

// APP LOGIC
function userCommand(userInput, userQuery) {
    //make a decision based on the command
    switch (userInput) {
        case "concert-this":
            concertThis();
            break;
        case "spotify-this":
            spotifyThisSong();
            break;
        case "movie-this":
            movieThis();
            break;
        case "do-this":
            doThis(userQuery);
            break;
        default:
            console.log("I don't understand");
            break;
    }
}
userCommand(userInput, userQuery);

function concertThis() {
    console.log(`\n - - - - -\n\n searching for...${userQuery}'s next show...`);

    //USE REQUEST AS OUR QUERY URL USING OUR USER QUERY VARIABLE AS THE PARAMETERS OF OUR SEARCH
    axios.get("https://rest.bandsintown.com/artists/" + userQuery + "/events?app_id=codingbootcamp")
        .then(function (response) {
            console.log('response.data', response.data);

            for (var i = 0; i < response.data.length; i++) {
                console.log(`\nHurray! That's for you...\n\n Artist: ${response.data[i].lineup[0]} \nVenue: ${response.data[i].venue.name} \nVenue Location: ${response.data[i].venue.latitude}.${response.data[i].venue.longitude} \nVenue City: ${response.data[i].venue.city}.${response.data[i].venue.country}`)

                // moment.js to format the date to MM/DD/YYYY
                let concertDate = moment(response.data[i].datetime).format("MM/DD/YYYY hh:00 A");
                console.log(`Date and Time: ${concertDate}\n\n - - -`);
            };


        })

};

function spotifyThisSong() {
    console.log(`\n - - - - -\n\nSearching For..."${userQuery}"`);

    //IF USER QUERY NOT FOUND, PASS VALUE OF "SONG NOT FOUND"
    if (!userQuery) { userQuery = "song not found" };

    //SPOTIFY SEARCH QUERY FORMAT
    spotify.search({ type: 'track', query: userQuery, limit: 1 }, function (error, data) {
        if (error) {
            return console.log('Error occured: ' + error);
        }
        //COLLECT SELECTED DATA IN AN ARRAY
        let spotifyArr = data.tracks.items;

        for (i = 0; i < spotifyArr.length; i++) {
            console.log(`\nHurray! That's for you...\n\nArtist: ${data.tracks.items[i].album.artists[0].name} \nSong: ${data.tracks.items[i].name} \nSpotify Link: ${data.tracks.items[i].external_urls.spotify} \nAlbums: ${data.tracks.items[i].album.name}\n\n - - - - -`)
        };
    });
}


function movieThis() {
    console.log(`\n - - - - -\n\nSearching For..."${userQuery}"`);
    if (!userQuery) { userQuery = "mr nobody"; };

    //REQUEST WITH AXIOS TO THE OMDB API
    axios.get("http://www.omdbapi.com/?t=" + userQuery + "&apikey=trilogy")
        .then(function (response) {
            let data = response.data;

            // console.log('data =>', data);

            let ratingsArr = data.Ratings;
            console.log(ratingsArr);
            
            console.log(`\n Hurray! That's for you...\n\n Title: ${data.Title}\n Cast: ${data.Actors}\n Released: ${data.Year}\nIMDb Rating: ${data.imdbRating}\nRotten Tomatoes Rating: ${data.Ratings[1].Value}\nCountry:
            ${data.Country}\n Language: ${data.Language}\n Plot: ${data.Plot} \n\n- - - - -`)

        })
        .catch(function (error) {
            if (error) {
                console.log('error occured', error);
            }
        });
};


function doThis() {
    fs.readFile("random.txt", "utf8", function (error, data) {
        if (error) { return console.log(erro); }
        //Catch data and use the .SPLIT method to seperate objects within our new array
        let dataArr = data.split(",");

        //Take objects from random.txt to pass as parameters
        userInput = dataArr[0];
        userQuery = dataArr[1];

        //Call our Function with our New Parameters
        userCommand(userInput, userQuery);

    });
};















