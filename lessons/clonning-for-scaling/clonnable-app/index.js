import http from "http";
import cluster from "cluster";
import OS from "os";

const cpuCount = OS.cpus().length;

if(cluster.isPrimary){
    console.log(
			"Inside a primary master process 👑",
			process.pid
		);
    // these 3 forks will create 3 child / worker / secondary processes
    for(let i=0; i<cpuCount; i++){
        cluster.fork();
    }

}else{
    
    http.createServer((req, res)=>{
        const msg = `This is a worker process 🛠️ with ${process.pid} pid.`;
        console.log(msg);
        res.end(msg);
    }).listen(3000)

}


// to test:
// node index.js
// in a new terminal -> loadtest -n 400 http://localhost:3000