
	$(function(){
   	//make connection
	var socket = io.connect('http://localhost:3000')

	//buttons and inputs
	var message = $("#message")
	var username = $("#username")
	var send_message = $("#send_message")
	var send_username = $("#send_username")
	var chatroom = $("#chatroom")
	var feedback = $("#feedback")

	var score = ""

	//Emit message
	send_message.click(function(){
		socket.emit('new_message', {message : message.val()})
	})

	//Listen on new_message
	socket.on("new_message", (data) => {
		feedback.html('');
		message.val('');
		console.log("sentiment-score: "+ data.score)

		// var score = data.score

		// console.log("score " + score)
		
		chatroom.append("<p class='user-message' style='color:pink;'>" + data.username + ": " + data.message + "</p>")


	})

	//Emit a username
	send_username.click(function(){
		socket.emit('change_username', {username : username.val()});
	})

	//Emit typing
	message.bind("keypress", () => {
		socket.emit('typing');
	})

	//listen for incoming sentiment scores
	socket.on('scores', (data) => {
		//console.log('scores data is', data.score);
		console.log("saved score: " + data.score);

		if (data.score < 0) {
			console.log("here1")
			chatroom.append("<p class='sentiment-message' style='background-color: pink; border-color: pink;'>" + "Mood score: " + data.score +"</p>")
		}else if (data.score > 0) {
			console.log("here2")
			chatroom.append("<p class='sentiment-message' style='background-color: red; border-color:red;'>" + "Mood score: " + data.score + "</p>")
			//chatroom.append("<p class='user-message' style='color:brown;'>" + data.username + ": " + data.message + "</p>")
		}

	})

	//Listen on typing
	socket.on('typing', (data) => {
		feedback.html("<p><i>" + data.username + " is typing a message..." + "</i></p>");
	})
});


