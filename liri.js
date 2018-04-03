require("dotenv").config();
var keys = require('./keys.js');
var Spotify = require('node-spotify-api');
var Twitter = require('twitter');

var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);



var newInput = process.argv[2];
var oldinput = process.argv[3];

if( newInput==="twit"){
    newTwit()
}
else if(newInput=="spot"){
    newSpot()
}



function newSpot(){
    spotify.search({ type: 'track', query: 'All the Small Things',limit: 20 }, function(err, data) {
        if (err) {
          return console.log('Error occurred: ' + err);
        }
        for (i=0; i<data.tracks.items.length; i++){
            var newSearch = data.tracks.items[i].name;
            var secSearch = data.tracks.items[i].album.external_urls.spotify
        }
        console.log(secSearch)
      console.log(newSearch); 
      });


}



function newTwit(){
    var parameters = {
        screen_name : oldinput,
        count : 5
    }
    console.log("newTwit")
    console.log(parameters)
    
    client.get('statuses/user_timeline',parameters, function(err, tweets){
    if (err) {
        return console.log(err);
      }
      for(i=0; i<tweets.length;i++){
          var postingNew = ('letsee'+ '\n'+tweets[i].created_at+ '\n'+ tweets[i].text+'\n'+'new stuff     '+ tweets[i].user.location)
          console.log(postingNew)
      }
   })
}


