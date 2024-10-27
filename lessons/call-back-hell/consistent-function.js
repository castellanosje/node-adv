import fs from 'fs';
import { fileURLToPath } from 'url'; 

function printFilSize(fileName, cb){
    if(typeof fileName !== 'string'){
        // process.nextTick make function consistent so it behaves async
        return process.nextTick(
					cb,
					new TypeError("filename must be of type string")
				);
        // return cb(new TypeError('filename must be of type string'));
    }

    // async function
    fs.stat(fileName, (err, stats)=>{
        if(err){
            return cb(err);
        }
        cb(null, stats.size);
    });
}


const filename = fileURLToPath(import.meta.url); // tick

printFilSize(2, (err, size)=>{
    if(err) throw err;
    console.log(`The file size is ${size}KB`);
});

console.log("Goodbye dude!");