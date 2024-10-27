import http from "http";
import cluster from "cluster";
import OS from "os";

const cpuCount = OS.cpus().length;

if (cluster.isPrimary) {
	console.log("Inside a primary master process 👑", process.pid);
	// these 3 forks will create 3 child / worker / secondary processes
	for (let i = 0; i < cpuCount; i++) {
		cluster.fork();
	}
	cluster.on("exit", (worker) => {
		console.log(`worker process ${process.pid}. just killed. 💀`);
		console.log(`${Object.keys(cluster.workers).length} are remaining`);
        console.log("starting a new process worker");
        cluster.fork();
	});
} else {
	console.log(`started a worker process at ${process.pid}`);
	http
		.createServer((req, res) => {
            res.end(`Process: ${process.pid}`);
			if (req.url === "/kill") {
				process.exit();
			} else if (req.url === "/") {
				console.log(`serving request from ${process.pid}`);
			}
		})
		.listen(3000);
}

// to test:
// node index.js
// in a new terminal -> loadtest -n 400 http://localhost:3000
