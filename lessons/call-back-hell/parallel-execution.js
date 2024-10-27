import fs from 'fs';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { promisify } from 'util';


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const writeFile = promisify(fs.writeFile);
const unlink = promisify(fs.unlink);
const readdir = promisify(fs.readdir);

Promise.all([
	writeFile("test.md", "Hello world"),
	writeFile("test.txt", "Hello world"),
	writeFile("test.json", "Hello world"),
])
.then(() => readdir(__dirname))
.then(console.log)

setTimeout(
    ()=>
    Promise.all([
	    unlink("test.md"),
	    unlink("test.txt"),
	    unlink("test.json"),
    ]).then(()=>console.log('files eliminated')), 
5000)


// force execution of then clause as soon as any of the promises resolve
const wait = (sec) =>
	new Promise((resolves) => {
		setTimeout(resolves, sec * 1000);
	});


Promise.all([wait(8), wait(5), wait(3), wait(1)]).then(() =>
	console.log("Im waiting for all promises to resolve")
);

Promise.race([
    wait(8),
    wait(5),
    wait(3),
    wait(1)
]).then(()=>console.log('Im executing as soon as any of the promises resolve'))