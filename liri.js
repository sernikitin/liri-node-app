require("dotenv").config();
var keys = require('./keys.js');
var Spotify = require('node-spotify-api');
var Twitter = require('twitter');
var inquirer = require('inquirer');

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
      choices:['Tweets', 'Songs']
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
// function newSpotold(){
//     var parameters = {
//         type : 'track',
//         query : oldinput,
//         limit: 20 
//     }

//     spotify.search(parameters, function(err, data) {
//         if (err) {
//           return console.log('Error occurred: ' + err);
//         }
//         for (i=0; i<data.tracks.items.length; i++){
//             var newSearch = data.tracks.items[i].name;
//             var secSearch = data.tracks.items[i].album.external_urls.spotify
//         }
//         console.log(secSearch)
//       console.log(newSearch); 
//       });
// }



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



// function newTwit(){
//     var parameters = {
//         screen_name : oldinput,
//         count : 5
//     }
//     console.log("newTwit")
//     console.log(parameters)
//     client.get('statuses/user_timeline',parameters, function(err, tweets){
//     if (err) {
//         return console.log(err);
//       }
//       for(i=0; i<tweets.length;i++){
//           var postingNew = ('letsee'+ '\n'+tweets[i].created_at+ '\n'+ tweets[i].text+'\n'+'new stuff     '+ tweets[i].user.location)
//           console.log(postingNew)
//       }
//    })
// }


