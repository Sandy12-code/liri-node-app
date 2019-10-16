require("dotenv").config();
var keys = require("./keys.js");

var Spotify = require("node-spotify-api");

var spotify = new Spotify(keys.spotify);

var nodeArg = process.argv;
console.log(nodeArg);

console.log(process.argv[2]);

var command = process.argv[2];

