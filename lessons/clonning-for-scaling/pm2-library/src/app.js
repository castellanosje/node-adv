import http from "http";
const port = parseInt(process.argv[2] || "3000");

// Array of jokes to send as responses
const jokes = [
	"Why don't skeletons fight each other? They don't have the guts.",
	"I'm reading a book about anti-gravity. It's impossible to put down!",
	"Why did the scarecrow win an award? Because he was outstanding in his field!",
	"Why don’t scientists trust atoms? Because they make up everything!",
	"What do you call fake spaghetti? An impasta!",
];

const server = http.createServer((req, res) => {
	// Select a random joke
	const randomIndex = Math.floor(Math.random() * jokes.length);
	const joke = jokes[randomIndex];

	// Send the joke as JSON
	const responsePayload = JSON.stringify({
		joke,
		processID: process.pid,
	});

	// Set response header and status
	res.writeHead(200, { "Content-Type": "application/json" });
	// Send the response with the joke
	res.end(responsePayload);
});

// Start the server and listen on the specified port
server.listen(port, () => {
	console.log(`Joke server is running on port ${port}`);
});


// PM2 HINTs

/*
1. pm2 start
2. pm2 stop all
3. pm2 delete all
4. pm2 monit
5. pm2 ls
6. pm2 restart
7. pm2 reload (0 downtime deploy)
8. pm2 logs
*/