import { createServer } from "http";
import { stat, createReadStream, createWriteStream } from "fs";
import { promisify } from "util";
import multiparty from 'multiparty';

const filename = "../assets/the-universe.mp4";
const fileInfo = promisify(stat);

const respondWithVideoStream = async (req, res) => {
	const { size } = await fileInfo(filename);
	const range = req.headers.range;
	if (range) {
		let [start, end] = range.replace(/bytes=/, "").split("-");
		start = parseInt(start);
		end = end ? parseInt(end) : size - 1;
		res.writeHead(206, {
			"Content-Range": `bytes ${start}-${end}/${size}`,
			"Accept-Range": "bytes",
			"Content-Length": end - start + 1,
			"Content-Type": "video/mp4",
		});
		createReadStream(filename, { start, end }).pipe(res);
	} else {
		res.writeHead(200, { "Content-length": size, "Content-type": "video/mp4" });
		createReadStream(filename).pipe(res);
	}
};

createServer((req, res)=>{
    if(req.method === 'POST'){
        // // returns the file to the client
        // req.pipe(res);
        // //  writes the file in the filesystem
        // req.pipe(createWriteStream('./assets/test-upload.file'));

        const form = new multiparty.Form();
        form.on('part', (part)=>{
            part.pipe(createWriteStream(`../assets/${part.filename}`))
            .on('close', ()=>{
                res.writeHead(200, {'Content-Type':'text/html'});
                res.end(`<h1>${part.filename} was uploaded</h1>`);
            })
        });
        form.parse(req);
    }
    else if(req.url === "/video"){
        respondWithVideoStream(req,res);
    }else{
        res.writeHead(200, {'Content-Type':'text/html'});
        res.end(`
                <form enctype="multipart/form-data" method="POST" action="/">
                    <input type="file" name="upload-file" />
                    <button>Upload</button>
                </form>
            `);
    }
}).listen(3000, () =>
	console.log("server is running on 3000")
);
