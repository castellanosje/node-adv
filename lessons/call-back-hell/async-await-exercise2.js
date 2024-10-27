import fs from "fs";
import { promisify } from "util";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const promisifiedReaddir = promisify(fs.readdir);

console.log(import.meta);

const test = async ()=>{
    const files = await promisifiedReaddir(__dirname);
    console.log(files);
}

test();