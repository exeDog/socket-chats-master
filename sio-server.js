var express = require("express");
var http = require("http");
var app = express();
var port = process.env.PORT || 5000;
var server = http.createServer(app).listen(port);
var io = require("socket.io")(server);

app.use(express.static("./public"));

io.on("connection", function(socket) {

    socket.on("chat", function(message) {
    	socket.broadcast.emit("message", message);
    });

	socket.emit("message","Welcome to Chattes.Please enter your name to join the chat");

});
