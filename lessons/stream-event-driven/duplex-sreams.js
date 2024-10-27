import { Duplex, PassThrough } from "stream";
import { createReadStream, createWriteStream  } from "fs";


class Throttle extends Duplex {
	constructor(ms) {
		super();
		this.delay = ms;
	}
	_write(chunk, encoding, callback) {
        this.push(chunk);
        setTimeout(()=>callback(), this.delay);
    }
	_read() {

    }
    _final(){
        this.push(null);
    }
}

const readStream = createReadStream("../assets/the-universe.mp4");
const writeStream = createWriteStream("../assets/copy.mp4");

const report = new PassThrough();
const throttle = new Throttle(20);
let size = 0;

report.on('data', (chunk)=>{
    size += chunk.length;
    console.log(`data size in bytes: ${size}b`);
})

readStream
	.pipe(report)
	.pipe(throttle)
	.pipe(writeStream)
	.on("error", console.error);
