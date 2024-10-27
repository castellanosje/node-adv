import { createReadStream, createWriteStream, write } from "fs";

const readStream = createReadStream("../assets/the-universe.mp4");
// watermark allows to allocate specific memory for data chunks
const writeStream = createWriteStream("../assets/copy.mp4");

readStream.pipe(writeStream).on("error", console.error);

const writeStreamB = createWriteStream("../assets/pipedStream.txt");

process.stdin.pipe(writeStreamB);