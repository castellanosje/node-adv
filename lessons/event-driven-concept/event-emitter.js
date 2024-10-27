import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname } from "path";
import {EventEmitter} from "events";


const __filename = fileURLToPath(import.meta.url);


// asyncronous emitter
// make sure to handle errors with an event emitter
class DoLog extends EventEmitter{
    
    execute(asyncFn, ...args){
        const labelWithTime = "execute- " + Date.now();
        console.time(labelWithTime);
        this.emit('start');
        asyncFn(...args, (err,data)=>{
            if(err){
                return this.emit('error', err);
            }
            this.emit('data', data);
            console.timeEnd(labelWithTime);
            this.emit("end");
        });
    }
}


const doLog = new DoLog();

// to handle custom emitters
doLog.on("start", ()=> console.log('...starting'));
doLog.on("end", () => console.log("!!!Execution is finished!!!"));
doLog.on("data", (data) => {
    console.log(`Size: ${data.length}`);
});

// prependListenner let you to add at the beginning of the listenner queue
doLog.prependListener("data", (data) => console.log(`Number of chars: ${data.toString().length}`));


doLog.removeListener("data", () =>
	console.log(`removes the data listenner`)
);


// to handle errors (always make sure to handle errors to prevent app crashing)
doLog.on("error", (error) => console.log(`there was an error: ${error}`));
// once prevents the logic from executing multiple times and prevent memory leaking
doLog.once("uncaughtException", (error) =>{
	console.log(`there was an uncaughtException: ${error}`);
    // cleanup logic
    process.exit(1);
});

// to execute the event emitter with an async function
doLog.execute(fs.readFile, "");
doLog.execute(fs.readFile, __filename);

// syncronous emitter
// class DoLog extends EventEmitter{
//     execute(taskFn){
//         console.log("Before exec.");

//         this.emit('start');

//         taskFn();

//         this.emit('end');
//         console.log("After exec");
//     }
// }


// const doLog = new DoLog();

// doLog.on("start", ()=> console.log('...starting'));
// doLog.on("end", () => console.log("!!!Execution is finished!!!"));
// doLog.execute(() => console.log("@@@ Executing task @@@"));