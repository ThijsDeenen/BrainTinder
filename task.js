var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);  //pass a http.Server instance
var express = require('express');
app.use(express.static('www'));

app.get('/', function(req, res){
  res.sendFile(__dirname + 'www/index.html');
});

io.on('connection', function(socket){
  console.log('a user connected');
});


http.listen(8000, function(){
  console.log('listening on *:8000');
});

// var http = require('http');
// var fs = require('fs');

// http.createServer(function (req, res) {
//     res.writeHead(200, {'Content-Type': 'text/html'});
//     fs.readFile('./index.html', null, function(error, data){
//       if (error){
//         res.writeHead(404);
//         res.write('file not found');
//       } else{
//         res.write(data);
//       }
//       res.end();
//     })
// }).listen(8080);

// http.createServer(function (req, response) {
//   switch (req.url) {
//     case "/styling.css" :
//         response.writeHead(200, {"Content-Type": "text/css"});
//         fs.readFile('./styling.css');
//         break;
//     default :    
//         response.writeHead(200, {"Content-Type": "text/html"});
//         fs.readFile('./index.html');
//       };
// response.end();
// })
// .listen(8080);

var leapjs      = require('leapjs');
var controller  = new leapjs.Controller({enableGestures: true, inNode:true});

// controller.on('deviceFrame', function(frame) {
//   // loop through available gestures
//   for(var i = 0; i < frame.gestures.length; i++){
//     var gesture = frame.gestures[i];
//     var type    = gesture.type;          

//     switch( type ){

//       case "circle":
//         if (gesture.state == "stop") {
//           console.log('circle');
//         }
//         break;

//       case "swipe":
//         if (gesture.state == "stop"){
//           console.log('swipe');
//         }
//         break;

//       case "screenTap":
//         if (gesture.state == "stop") {
//           console.log('screenTap');
//         }
//         break;

//       case "keyTap":
//         if (gesture.state == "stop") {
//           console.log('keyTap');
//         }
//         break;

//       }
      
//     }
// });

/////////////////////////////////////////////////////////////

var controllerOptions = {enableGestures: true, inNode: true};

leapjs.loop(controllerOptions, function(frame) {

  if (frame.gestures.length > 0) {
    for (var i = 0; i < frame.gestures.length; i++) {
      var gesture = frame.gestures[i];

      if (gesture.type == "swipe") {
          //if the gesture is a swipe, detect if it's either left or right and send this data to main.js
          var isHorizontal = Math.abs(gesture.direction[0]) > Math.abs(gesture.direction[1]);
              if(gesture.direction[0] > 0){
                  console.log("right");
                  io.emit("right", "right");
              } else {
                  console.log("left");
                  io.emit("left", "left");
              }
       }
     }
  }
})
controller.connect();

// // Get process.stdin as the standard input object.
// var standard_input = process.stdin;

// // Set input character encoding.
// standard_input.setEncoding('utf-8');

// // Prompt user to input data in console.
// console.log("Please input text in command line.");

// // When user input data and click enter key.
// standard_input.on('data', function (data) {
//     // User input exit.
//     if(data === 'exit\n'){
//         // Program exit.
//         console.log("User input complete, program exit.");
//         process.exit();
//     }else
//     {
//         // Print user input in console.
//         directionOfSwipe = data;
//         console.log('User Input Data : ' + data);
//     }
// });