
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
		
		chatroom.append("<p class='user-message' style='font-family: Arial; color: black; background-color: #E5E5E5; border-color: #E5E5E5;'>" + "<strong>" + data.username + "</strong>" + ": " + data.message + "</p>")


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
		//var newnum = data.score * 0.000345124;
		//var n = newnum.toFixed(5);
		var n = data.score;


		// negative is red
		// positive is blue 

		if ((n >= -1.0) && (n < -0.8)) {
			console.log("-1.0 < data.score < -0.8")
			chatroom.append("<p class='sentiment-message' style='font-family: Arial;background-color: #AE1807; border-color: #AE1807;'>" + "<strong>Mood score: </strong>" + n +"</p>")
		}
		else if ((n >= -0.8) && (n < -0.6)) {
			console.log("-0.8 < data.score < -0.6")
			chatroom.append("<p class='sentiment-message' style='font-family: Arial;background-color: #C23020; border-color: #C23020;'>" + "<strong>Mood score: </strong>" + n +"</p>")
		}
		else if ((n >= -0.6) && (n < -0.4)) {
			console.log("-0.6 < data.score < -0.4")
			chatroom.append("<p class='sentiment-message' style='font-family: Arial;background-color: #D05447; border-color: #D05447;'>" + "<strong>Mood score: </strong>" + n +"</p>")
		}
		else if ((n >= -0.4) && (n < -0.2)) {
			console.log("-0.4 < data.score < -0.2")
			chatroom.append("<p class='sentiment-message' style='font-family: Arial;background-color: #DA756A; border-color: #DA756A;'>" + "<strong>Mood score: </strong>" + n +"</p>")
		}
		else if ((n >= -0.2) && (n < 0.0)) {
			console.log("-0.2 < data.score < 0")
			chatroom.append("<p class='sentiment-message' style='font-family: Arial;background-color: #E09C95; border-color: #E09C95;'>" + "<strong>Mood score: </strong>" + n +"</p>")
		}
		else if (n==0) {
			console.log("adata.score = 0")
			chatroom.append("<p class='sentiment-message' style='font-family: Arial;background-color: #E5E5E5; border-color: #E5E5E5;'>" + "<strong>Mood score: </strong>" + n +"</p>")
		}		
		else if ((0.0 < n) && (n < 0.2)) {
			console.log("0 < data.score < 0.2")
			chatroom.append("<p class='sentiment-message' style='font-family: Arial;background-color: #A6BEDE; border-color: #A6BEDE;'>" + "<strong>Mood score: </strong>" + n +"</p>")
		}
		else if ((n >= 0.2) && (n < 0.4)) {
			console.log("0.2 < data.score < 0.4")
			chatroom.append("<p class='sentiment-message' style='font-family: Arial;background-color: #799ED0; border-color: #799ED0;'>" + "<strong>Mood score: </strong>" + n +"</p>")
		}
		else if ((n >= 0.4) && (n < 0.6)) {
			console.log("0.4< data.score < 0.6")
			chatroom.append("<p class='sentiment-message' style='font-family: Arial;background-color: #4F86D0; border-color: #4F86D0;'>" + "<strong>Mood score: </strong>" + n +"</p>")
		}
		else if ((n >= 0.6) && (n < 0.8)) {
			console.log("0.6 < data.score < 0.8")
			chatroom.append("<p class='sentiment-message' style='font-family: Arial;background-color: #2C71CE; border-color: #2C71CE;'>" + "<strong>Mood score: </strong>" + n +"</p>")
		}
		else if ((n >= 0.8) && (n < 1)) {
			console.log("0.8 < data.score < 1")
			chatroom.append("<p class='sentiment-message' style='font-family: Arial;background-color: #045BCF; border-color: #045BCF;'>" + "<strong>Mood score: </strong>" + n +"</p>")
		}


	})

	//Listen on typing
	socket.on('typing', (data) => {
		feedback.html("<p><i>" + data.username + " is typing a message..." + "</i></p>");
	})
});


