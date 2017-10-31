
// Link Keys.js 
// var mykeys = require("./keys");



var searchParam = process.argv[2];

switch (searchParam){
  case "my-tweets":
    myTwitter();
    break;

  case "spotify-this-song":
    mySpotify();
    break;

  case "movie-this":
    myMovie();
    break;

  default:
    console.log("invalid item");
    break;
}



// TWITTER SEARCH TERMS

function myTwitter (){

  var Twitter = require('twitter');

  var client = new Twitter({
    consumer_key: "nIExOzZ4Gy2JwiT4BS0ZhFBdi",
    consumer_secret: "mgwFBZe9WqeLZvQUrUvOz2lVvc19AslQqdLOHZG1C8RRm16RfR",
    access_token_key: "924630193825832961-84SFE3OZ58IVXy64CFtwZOE01NB1EwF",
    access_token_secret: "44BjocQzC3V17ZC7TAU1jstmdMzckLBBdHMvafMIBVH2l",
  });

  var params = {screen_name: '@mountain_up', count: 8};
  client.get('statuses/user_timeline', params, function(err, tweets, response) {
    if (err) {
      return console.error(err);
    } else {
        for (i = 0; i < tweets.length; i++) {
        console.log(tweets[i].text); 
        }
      }
  });

};



// SPOTIFY SONG LOOKUP 

function mySpotify (){

  var songName = process.argv[3];
  var Spotify = require('node-spotify-api');
   
    var spotify = new Spotify({
      id: "f062f48eef3649c8894892d5c8a42635",
      secret: "ece6a269205a4c329df0f563fba1dc3a"
    });

    spotify.search({ type: 'track', query: songName }, function(err, song) {
      if (err){
        console.log(err);
      } else {

        var songData = (song.tracks.items);

          for (i = 0; i < 10; i++) {
            console.log("---------------"); 
            console.log("Song Name: " + songData[i].name); 
            console.log("Song Popularity: " + songData[i].popularity); 
            console.log("Explicit? " + songData[i].explicit);
            console.log("Album Name: " + songData[i].album.name);
            console.log("URL: " + songData[i].external_urls.spotify);
          }
      }
  });
};





// OMDB MOVIE SEARH TERMS

function myMovie (){


  var request = require('request');
  var movieName = process.argv[3];

  var omdbUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=40e9cece";
  request(omdbUrl, function (err,  movie, response) {
    if (err) {
      return console.error(err);

    } else {

      var myData = JSON.parse(response);

      console.log ("Movie Title: " + myData.Title);
      console.log ("Year Released: " + myData.Year);
      console.log ("Movie Rating: " + myData.Rated);
      console.log ("Awards: " + myData.Awards);
      console.log ("Movie Plot: " + myData.Plot);

   }

  });

};



