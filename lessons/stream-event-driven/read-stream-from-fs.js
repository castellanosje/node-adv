import fs from 'fs';

const readStream = fs.createReadStream("../assets/the-universe.mp4");

// flowing mode
readStream.on('data', (chunk)=>{
    console.log("chunk size:\n", chunk.length);
});

readStream.on("end", ()=>{
    console.log("stream ended");
});

readStream.on("error", (error)=>{
    console.error(error);
})


// non flowing mode
// this stream remains open, waits for data to be provided
readStream.pause();

process.stdin.on('data', (chunk)=>{
    if(chunk.toString().trim()==='end'){
        // turn off non flowing mode
        readStream.resume();
    }
    readStream.read();
})