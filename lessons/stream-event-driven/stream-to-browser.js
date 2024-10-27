import { createServer } from "http";
import { stat, createReadStream } from "fs";
import { promisify } from 'util';
const filename = "../assets/the-universe.mp4";
const fileInfo = promisify(stat);

createServer( async (req, res) => {
    const { size } = await fileInfo(filename);
    res.writeHead(200, {"Content-length": size, 'Content-type':'video/mp4'});
    createReadStream(filename).pipe(res);
}).listen(3000, ()=> console.log("server is running on 3000"));