const express = require('express')
const app = express()

// Imports the Google Cloud client library
const language = require('@google-cloud/language');

// Instantiates a client
const client = new language.LanguageServiceClient();


//set the template engine ejs
app.set('view engine', 'ejs')

//middlewares
app.use(express.static('public'))


//routes
app.get('/', (req, res) => {
	res.render('index')
})

//Listen on port 3000
server = app.listen(3000)


//socket.io instantiation
const io = require("socket.io")(server)

//listen on every connection
io.on('connection', (socket) => {
	console.log('New user connected')

	//default username
	socket.username = "Anonymous"

    //listen on change_username
    socket.on('change_username', (data) => {
        socket.username = data.username
    })

    //listen on new_message
    socket.on('new_message', (data) => {
        //broadcast the new message

        // var text = data;
        // var document = {
        //   content: text,
        //   type: 'PLAIN_TEXT',
        // };

        // var [result] = client.analyzeSentiment({document});
        // const sentiment = result.documentSentiment;
        // console.log(`Text: ${data}`);
        // console.log(`Sentiment score: ${sentiment.score}`);
        // console.log(`Sentiment magnitude: ${sentiment.magnitude}`);

        // io.sockets.emit('new_message', {message : data.message, username : socket.username, score: sentiment.score});


        io.sockets.emit('new_message', {message : data.message, username : socket.username});
        analyzing(data.message);
    })

    //listen on typing
    socket.on('typing', (data) => {
    	socket.broadcast.emit('typing', {username : socket.username})
    })

    async function analyzing(data){
        var text = data;
        var document = {
          content: text,
          type: 'PLAIN_TEXT',
        };

        var [result] = await client.analyzeSentiment({document});
        const sentiment = result.documentSentiment;
        console.log(`Text: ${data}`);
        console.log(`Sentiment score: ${sentiment.score}`);
        console.log(`Sentiment magnitude: ${sentiment.magnitude}`);

        // send sentiment data to the frontend
        io.sockets.emit('scores', {score: sentiment.score});
    }
})
