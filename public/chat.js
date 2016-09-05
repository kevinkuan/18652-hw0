window.onload = function() {
	var messages = [];
	var socket = io.connect('http://' + location.host);
	var textField = document.getElementById("textField");
	var sendButton = document.getElementById("send");
	var content = document.getElementById("content");
	var name = document.getElementById("name");

	socket.on('message', function (data) {
		if(data.message) {
			messages.push(data);
			var html = '';
			for(var i = 0; i < messages.length; i++) {
				if (messages[i].username) {
					html += '<b>' + messages[i].username + ' </b>';
				} else {
					html += '<b>' + ' </b>';
				}
				html += messages[i].message + ' <br />';
			}
			content.innerHTML = html;
		} else {
			console.log("Error: ", data);
		}
	});

	sendButton.onclick = sendMessage = function() {
		var today = new Date().toLocaleString();
		var text = ' (' + today + '): ' + textField.value;
		socket.emit('send', { message: text, username: name.value });
		textField.value = "";
	};

}
