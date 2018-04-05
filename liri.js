require("dotenv").config();
var keys = require('./keys.js');
var Spotify = require('node-spotify-api');
var Twitter = require('twitter');
var inquirer = require('inquirer');
var request = require("request");

var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);


// var newInput = process.argv[2];
// var oldinput = process.argv[3];

///user select 
inquirer.prompt([

    {
      type: "list",
      name: "userInput",
      message: "Looking for Tweets or songs ?",
      choices:['Tweets', 'Songs','Movie']
    }
  ]).then(function(select) {
    if( select.userInput=="Tweets"){
        //if twit was selected
        newTwit()
    }
    else if(select.userInput=="Songs"){
        //if spot was selected 
        newSpot()
    }
    else if(select.userInput=="Movie"){
      //if spot was selected 
      movie()
  }
  });

//ask more questions on what they want lol
function newSpot(){
inquirer
  .prompt([
    {
      type: 'list',
     // name: 'theme',
      message: 'select track'+'\n',
      name:'type',
      choices: ['track']
    },
    {
        type: 'input',
       // name: 'theme',
        message: 'Search for artist'+'\n',
        name:'query',
      },
  ])
.then(function(answer){
    console.log(answer.query)
    //clean 
    var parameters = {
        type : answer.type,
        query : answer.query,
        limit: 1
    }
    //searching for what even select was 
    spotify.search(parameters, function(err, data) {
        console.log(answer.type, answer.query)
        
        console.log(JSON.stringify(data, null, 2));
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
})
}

//logic for searching tweets by user id 
function newTwit(){

    inquirer
    .prompt([
      {
        type: 'input',
        name: 'theme',
        message: 'You can search for user id '+'\n',
        name:'lol'
      },
    ])
  .then(function(answer){
    //clean
    var parameters = {
        screen_name : answer.lol,
        count : 5
    }
    console.log("newTwit")
    console.log(parameters)
    //searching for what ever input
    client.get('statuses/user_timeline',parameters, function(err, tweets){
    if (err) {
        return console.log(err);
      }
      for(i=0; i<tweets.length;i++){
          var postingNew = ('Tweet was born on: '+tweets[i].created_at+ '\n'+ 'Tweet information: '+tweets[i].text+'\n'+'Tweet location : '+ tweets[i].user.location)
          console.log(postingNew)
      }
   })
  })
}
function movie(){
  inquirer
  .prompt([
    {
      type: 'input',
      name: 'theme',
      message: 'Search for movie name :' +'\n',
      name:'lol'
    },
  ])
.then(function(answer){
  console.log(answer.lol)
     request("http://www.omdbapi.com/?t="+answer.lol+"&apikey=trilogy", function(error, response, body) {
  if (!error && response.statusCode === 200) {
    console.log(`
    *******
    * Title of the movie:  ${JSON.parse(body).Title}
    * Year the movie came out:  ${JSON.parse(body).Year}
    * IMDB Rating of the movie:  ${JSON.parse(body).Rated}
    * Rotten Tomatoes Rating of the movie:  ${JSON.parse(body).Value}
    * Country where the movie was produced:  ${JSON.parse(body).Country}
    * Language of the movie:  ${JSON.parse(body).Language}
    * Plot of the movie:  ${JSON.parse(body).Plot}
    * Actors in the movie.:  ${JSON.parse(body).Actors}
    *******
    `)
  }
});
})

 
}


