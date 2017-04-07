


$(document).ready(function(){

 $.ajax({
    url: "https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22philadelphia%2C%20pa%22)&format=json", 
    error: function(data){
      console.log('BUSTED AJAX', data); 
    }, 
    success: function(result){
     var forecast = result.query.results.channel.item.forecast;
     forecast.forEach(function(el){
      $('.weather').append('<li style="color: dodgerblue">' + el.day + ", " + el.date + " " + el.high + ' ' + el.low + ' ' + el.text + '</li>'); 
    }); 
  $('.word').text("Hello");  
    }
    }); 



  setTimeout(function() {
    $('.introTextWords').css({'top': '40%', 'opacity': .4});  
  }, 1200);
  setTimeout(function() {
    $('.introTextWords').css({'opacity': 1});  
  }, 3500);



//SHOW LOADING SCREEN WHILE NEW SIXERS ACTION SHOTS ARE COLLECTED
  // function onReady(callback) {
  //     var intervalID = window.setInterval(checkReady, 5500);

  //     function checkReady() {
  //       var actionShotFlag = true; 
  //       $('.actionShot').each(function(i, el){
  //           if(el.currentSrc === undefined){
  //             console.log('not defined yet', el); 
  //            actionShotFlag = false; 
  //          }
  //       }); 
  //         if (actionShotFlag === true){
  //             window.clearInterval(intervalID);
  //             callback.call(this);
  //         }
  //     }
  // }

  // function show(id, value) {
  //     document.getElementById(id).style.display = value ? 'block' : 'none';
  // }

  // onReady(function () {
  //     show('everything', true);
  //     show('loading', false);
  // });

  //END OF LOADING SCREEN CODE

  var storedActionPics = {}; 
    //Head to real-time data scrape sixers page 
  $('#top3').click(function(){
    window.location = 'https://dreamsixersinthecloud.herokuapp.com/'; 
  });
  $('#innerTweets').click(function(){
    $('#innerTweets').toggleClass('innerTweetsChange'); 
  }); 
  $('#top').click(function(){
     $('#top').toggleClass('topChange'); 
  }); 
  $('#top2').click(function(){
    $('#top2').toggleClass('top2Change'); 
  }); 
   $('.top4').click(function(e){
    $('.top4').toggleClass('top4Change'); 
     
    if (e.target.id.indexOf("sixersGif") !== -1) {
      $('.top4').toggleClass('top4Change'); 
      var target = e.target.id; 
      $('#' + target).toggleClass('bigGif'); 
    }
  });  
    

  //AJAX CALL engages Scraper.js via server then userController, which pulls stats, articles and pictures from the web
//   $.ajax({
//     url: "/actionPics", 
//     error: function(data){
//       console.log('BUSTED', data); 
//     }, 
//     success: function(result){
//       storedActionPics = result;
//       console.log(storedActionPics); 
//       getAllOtherData();  
//     }
//     }); 
//   function getAllOtherData(){
//   $.ajax({
//     url: "/realData", 
//     error: function(data){
//       console.log('BUSTED', data); 
//     }, 
//     success: function(result){
//       // console.log('AJAX', result); 
//       var dataTable = result; 
//       dataTable.forEach(function(el, i){
//         if (Array.isArray(el)){ 
//           if (el[0][0] === 'h' && (el[0].indexOf('i.cdn.turner') === -1) && (el[0].indexOf('tumblr') === -1)) { //pics are in nested array where each item is a string that starts with 'h' [['h']]
//             el.forEach(function(inel){
//               $('#top').append("<img style='width: 10rem' src=" + inel + ">");   
//             });  
//           } 
//           else if (el[0][0] === 'h' && (el[0].indexOf('i.cdn.turner') !== -1 || el[0].indexOf('tumblr') !== -1)){
//             el.forEach(function(inel, j){
//               $('.top4').append("<img class='sixerGif' id='sixersGif" + j + "' src=" + inel + ">");   
//             });  
//           }
//           else { //article links are objects in an array nested in the larger array - [[{}]]
//             el.forEach(function(inel){
//               $('#top2').append("<a target='blank' style='margin-left: 3%' href=" + inel.href + ">" + inel.text +"</a>");   
//             }); 
//           }
//         } else { //player info are objects in the larger array - [{}]
//           var firstName = el.name.slice(0, el.name.indexOf(' '));
//           if (firstName  === 'T.J.') firstName = 'TJ';  
//           $('#outer').prepend("<div class='datacell' id=" + firstName + "><h2>" + el.name + "</h2><p class='stats'>Position: " + el.position + "</p><p class='stats'>Games Played: " + el.games + "</p><p class='stats'>Points: " + el.points + "</p><p class='stats'>PPG: " + el.PPG + "</p><p class='stats'>FG%: " + el.fgPct + "</p><p class='stats'>3Pt%: " + el.threePtPct + "</p><p class='stats'>REBS: " + el.reb + "</p><p class='stats'>AST: " + el.ast + "</p><p class='stats'>STL: " + el.stl + "</p><img class='actionShot' src=" + storedActionPics[firstName] + " style='width: 10rem'></img></div>"); 
//         }    
//       }); //close forEach on retrieved 2D array
//     } //close success function
//   }); //close AJAX call
//   } //close getAllOtherData function
 });