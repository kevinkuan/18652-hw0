var express = require("express");
var app = express();
var port = 8888;
var fs = require('fs');

app.set('views', __dirname + '/page');
app.set('view engine', 'html');
app.engine('html', require('ejs').renderFile);
app.use(express.static(__dirname + '/public'));

app.get("/", function(req, res){
	res.render("page");
});

var io = require('socket.io').listen(app.listen(port));

io.sockets.on('connection', function (socket) {
	socket.emit('message', { message: 'You have joined the chat.' });
	socket.on('send', function (data) {
		io.sockets.emit('message', data);
	});
});
console.log("Port " + port);
