import {createReadStream, createWriteStream, write} from "fs";

const readStream = createReadStream("../assets/the-universe.mp4");
const writeStream = createWriteStream("../assets/copy.mp4");

readStream.on("data", (chunk) => {
	writeStream.write(chunk);
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

writeStream.on('close', ()=>{
    process.stdout.write("file copied. \n");
})