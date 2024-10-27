import {pipeline} from "node:stream/promises";
import { Readable } from "node:stream";
import { setInterval } from "node:timers/promises";

async function* myReadable(
    // ac
){
    for await(const interval of setInterval(300)){
        // if(ac.signal.aborted)break
        yield Buffer.from("Tick ")
    }
}

async function* myWritable(stream){
    for await(const chunk of stream){
        console.log("Writable:✅", chunk.toString());
    }
}

const abortController = new AbortController();

abortController.signal.onabort = () =>{
    console.log("the process was aborted");
}

setTimeout(()=>{abortController.abort();}, 1000);

try{
    await pipeline(Readable.from(myReadable()), myWritable, {
			signal: abortController.signal,
		});
}catch(err){
    if(err.code !== "ABORT_ERR") throw err;
}

// if we use this method the abort controller must be passed as a function param to the readable generator function 
// pipeline(myReadable, myWritable, {signal: abortController.signal});