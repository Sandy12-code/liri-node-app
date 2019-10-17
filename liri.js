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

// console.log(keys);
// create a new INSTANCE of the Spotify Library for use to use as a variable


// var nodeArg = process.argv;
// console.log(nodeArg);


// console.log(process.argv[2]);

// console.log(command);

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
    console.log(`\n-------\n\nsearching for...${userQuery}'s next show...`);

    //USE REQUEST AS OUR QUERY URL USING OUR USER QUERY VARIABLE AS THE PARAMETERS OF OUR SEARCH
    request("https://rest.bandsintown.com/artists/" + userQuery + "/events?app_id=codingbootcamp" + bandsintown, function (response, body) {
        if (!error && response.statuscode === 200) {
            //Capture data and use JSON to format
            let userBand = JSON.parse(body);
            //Parse data and use for loop to access paths to data
            if (userBand.lenght > 0) {
                for (i = 0; i < 1; i++) {
                    console.log(`\nHurray! That's for you...\n\nArtist: ${userBand[i].lineup[0]} \nVenue: ${userBand[i].venue.name} \nVenue Location: ${userBand[i].venue.latitude}.${userBand[i].venue.longitude} \nVenue City: ${userBand[i].venue.city}.${userBand[i].venue.country}`)

                    // moment.js to format the date to MM/DD/YYYY
                    let concertDate = moment(userBand[i].datetime).format("MM/DD/YYYY hh:00 A");
                    console.log(`Date and Time: ${concertDate}\n\n---`);
                };

            }
            else {
                console.log('Band or concert not found!');
            };
        };

    });
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
// spotify.search({ type: 'track', query: command, limit: 5 })
//     .then(function (response) {
//         console.log(response);
//         console.log(response.tracks);
//         var song_name = response.tracks.items[0];
//         console.log(song_name);
//         var item_1_track_name = response.tracks.items[0].name;
//         console.log(item_1_track_name);
//         var artist = response.tracks.items[0].artists[0].name;
//         console.log(artist);
//         var prev_link = response.tracks.items[0].preview_url;
//         console.log(prev_link);
//         var album = response.album.external_urls[0].name;
//         console.log(album);
//     })
//     .catch(function (err) {
//         console.log(err);
//     });

// }


function movieThis() {
    console.log(`\n - - - - -\n\nSearching For..."${userQuery}"`);
    if (!userQuery) { userQuery = "mr nobody"; };

    //REQUEST WITH AXIOS TO THE OMDB API
    axios.get("http://www.omdbapi.com/?t=" + userQuery + "&apikey=trilogy").then(
    function (error, response, ) {
        let ratingsArr = userMovie.Ratings;
        if (ratingsArr + length > 2) {
        }

        if (!error && response.statusCode === 200) {
            console.log(`\nHurray! That's for you...\n\nTitle: ${userMovie.Title}\nCast: ${userMovie.Actors}\nReleased: ${userMovie.Year}\nIMDb Rating: ${userMovie.imdbRating}\nRotten Tomatoes Rating: ${userMovie.Ratings[i].Value}\nCountry:
            ${userMovie.Country}\nLanguage: ${userMovie.Language}\nPlot: ${userMovie.Plot}\n\n- - - - -`)
        }
        else {
            return console.log("Movie not found. Error" + error)
        };
    });
};


// axios.get("http://www.omdbapi.com/?t=remember+the+titans&y=&plot=short&apikey=trilogy").then(
//     function (response) {
//         console.log("The movie's rating is: " + response.data.imdbRating);
//     })
//     .catch(function (error) {
//         if (error.response) {
//         }


function doThis() {
    fs.readFile("random.txt", "utf8", function (error, data) {
        if (error) {return console.log(erro); }
        //Catch data and use the .SPLIT method to seperate objects within our new array
        let dataArr = data.split(",");

        //Take objects from random.txt to pass as parameters
        userInput = dataArr[0];
        userQuery = dataArr[1];

        //Call our Function with our New Parameters
        userCommand(userInput, userQuery);

    });
};















