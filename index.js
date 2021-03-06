// var express = require('express');
// var app = express();

// app.set('port', (process.env.PORT || 5000));

// app.use(express.static(__dirname + '/public'));

// // views is directory for all template files
// // app.set('views', __dirname + '/views');
// // app.set('view engine', 'ejs');

// app.get('/', function(request, response) {
//   response.render('pages/index');
// });

// app.listen(app.get('port'), function() {
//   console.log('Node app is running on port', app.get('port'));
// });

var express = require('express'); 
var app = express(); 
var path = require('path'); 
// var scraper = require('./Javascript/scraper');  
var fs = require('fs'); 
//Adding scraper DATA here
var cheerio = require('cheerio');
var request = require('request');


app.use(express.static(path.join(__dirname, '/Sixers'))); 


//SIXERS ROUTES

app.get('/', function(request, res) {
  res.sendFile(path.join(__dirname, './Sixers/SixersDataViz.html')); 
});


app.get('/realData', function(req, res){
  res.send(dataArray); 
}); 


 app.set('port', (process.env.PORT || 5000));



//END OF SIXERS ROUTES


app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});




const scrapeController = {
  getData: (req, res) => {
    var dataArr = [], gifArr = [], gifArr2 = [], picArr = [], articleArr = [], check, testObj = {}, output, $, latestGifUrl, finalGifUrl, latestGifArr = [], storedGifs = [], testArr, useArr = [], redisFlag = false, picObj = {}; 

    request('http://www.nba.com/sixers/stats/averages', (error, response, html) => {
      if (error){
        res.writeHead(400, "text/html");
        res.send(error); 
       }
      var $ = cheerio.load(html);
      //collect only text from rows in table in var t
      var t = $('tr *').contents().map(function(el) {
      return (this.type === 'text') ? $(this).text() : '';
      }).get();

      $('.player-name__inner-wrapper').map(function(i, bqQ) {
        const output = cheerio(bqQ);
        // picArr.push(output.children('img').attr('src'));
        //push player pic img src link data into array
      }); 
      $('.player_name').map(function(i, bqQ) {
        const output = cheerio(bqQ);
        picArr.push({name: output.attr('title').substring(0, output.attr('title').indexOf(',')), pic: output.children('.player-name__inner-wrapper').children('img').attr('src')});
        
        // picArr.push(output.children) 
         
        // 
        //push player pic img src link data into array
      });
      picArr.forEach(function(el){ 
        picObj[el.name] = el.pic
      })
       // sendPics(picArr);
      //remove dots and empty spaces from collected data array
      for (var i = 0; i < t.length; i++){
        if (t[i] === '•') t.splice(i-3, 5, '\n'); 
        }
      for (i = 0; i < t.length; i++){
        if (t[i] === '') t.splice(i, 1); 
      }
      //remove unnecessary additional data after player stats
      t = t.slice(0, 290); 


      for (var j = 0; j < t.length; j++){
        if (t[j].indexOf('Jahlil') > -1 || t[j].indexOf('Justin') > -1 || t[j].indexOf('Robert') > -1 || t[j].indexOf('Nik') > -1 || t[j].indexOf('McCon') > -1 || t[j].indexOf('Chasson') > -1 || t[j].indexOf('Joel') > -1 || t[j].indexOf('Sean') > -1 || t[j].indexOf('Holmes') > -1 || t[j].indexOf('Luwaw') > -1 || t[j].indexOf('Saric') > -1 || t[j].indexOf('Sergio') > -1 || t[j].indexOf('awn') > -1){
          //loop through array, looking for player name, which is followed by all relevant stats
          var obj = {}; 
          obj.name = t[j]; 
          obj.number = t[j+1]; 
          obj.position = t[j+2]; 
          obj.games = t[j+3]; 
          obj.points = t[j+4]; 
          obj.PPG = parseFloat(t[j+4] / parseInt(obj.games)).toFixed(1); 
          obj.fgPct = t[j+6];
          obj.threePtPct = t[j+7];
          obj.reb = t[j+11];
          obj.ast = t[j+12];
          obj.stl = t[j+13];
          //collect all relevant stats in new obj for each player, push into array
          dataArr.push(obj);
        }

        else if (dataArr.length === 12){
          //once player data collected look for and remove any duplicates
          dataArr.forEach(function(el, i){
            //don't look through picture array
            if (!(Array.isArray(el))){
              if(testObj[el.name] === undefined) testObj[el.name] = 1; 
              else if (testObj[el.name] === 1) {
                dataArr.splice(i, 1);     
              }
            }
          }); 
       
   
        }//close conditional of all players having been collected
      }//close looping through all collected data
      return addPics(dataArr, picObj); 


    
    }); //close scraping NBA.com

      // if (redisFlag === true) console.log("USING GIFS IN REDIS"); 

      // dataArr.push(picArr.slice(0, 14));
       
      // return dataArr; 

    //send all collected data back to realStats.js
  } //CLOSES GETDATA
};  //Closes SCRAPECONTROLLER; 



//END OF SCRAPER DATA

scrapeController.getData(); 

var dataArray; 


 function addPics(arr, obj){
        arr.forEach(function(el){
          if (obj.hasOwnProperty(el.name)) el.pic = obj[el.name]; 
        })
        dataArray = arr;  
      }


module.exports = app; 

