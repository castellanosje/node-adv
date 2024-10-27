import { createReadStream, createWriteStream, write } from "fs";

const readStream = createReadStream("../assets/the-universe.mp4");
// watermark allows to allocate specific memory for data chunks
const writeStream = createWriteStream("../assets/copy.mp4", {highWaterMark: 16292225});

readStream.on("data", (chunk) => {
    const res = writeStream.write(chunk);
	if(!res){
        // backpressure
        console.log("backpressure");
        readStream.pause();
    }
});

readStream.on("end", () => {
	console.log("stream ended");
});

readStream.on("error", (error) => {
	console.error(error);
});

readStream.on("end", () => {
	writeStream.end();
});

writeStream.on("drain", () => {
    console.log("drained");
	readStream.resume();
});

writeStream.on("close", () => {
	process.stdout.write("file copied. \n");
});
